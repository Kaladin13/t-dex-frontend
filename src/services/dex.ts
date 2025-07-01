import { TonConnectUI } from '@tonconnect/ui-react'
import { Network } from '../components/NetworkSwitcher'
import { getTonClient } from './client'
import {
  getAmmPoolFromAddress,
  getFactory,
  getJettonVaultFromAddress,
  getTonVault,
} from './dex-factory'
import { Address, beginCell, fromNano, toNano, TonClient } from '@ton/ton'
import { JettonMinterFeatureRich } from './wrappers/FeatureRich_JettonMinterFeatureRich'
import { JettonMinter } from './wrappers/Jetton_JettonMinter'
import {
  JettonWalletFeatureRich,
  storeJettonTransfer,
} from './wrappers/FeatureRich_JettonWalletFeatureRich'
import { parseMetadataFromCell } from './jetton-helpers'
import { createJettonVaultSwapRequest } from './dex-utils'
import { waitForSeqno } from './utils'

type TonToken = {
  type: 'ton'
  symbol: string
  name: string
  logo: string
  balance: bigint
}

type JettonToken = {
  type: 'jetton'
  symbol: string
  name: string
  logo: string
  balance: bigint
  address: string
  vaultAddress: string
}

export type Token = TonToken | JettonToken

export async function onJettonAddressInput({
  address,
  tonConnectUI,
  network,
  setVaultAddress,
  onSelect,
}: {
  address: string
  tonConnectUI: TonConnectUI
  network: Network
  setVaultAddress?: (vault: string) => void
  onSelect: (token: Token) => void
}): Promise<void> {
  const tonClient = getTonClient('testnet')

  const jettonAddress = Address.parse(address)

  const factory = await getFactory(tonClient)
  const jettonVaultAddr = await factory.getJettonVaultAddr(jettonAddress)

  console.log(jettonVaultAddr.toString())
  if (setVaultAddress) setVaultAddress(jettonVaultAddr.toString())

  const jettonMaster = tonClient.open(JettonMinterFeatureRich.fromAddress(jettonAddress))
  const data = await jettonMaster.getGetJettonData()

  // support off-chain meta
  const parsedData = await parseMetadataFromCell(data.jettonContent)

  const userWalletAddress = tonConnectUI.account?.address
  let userBalance = 0n

  if (typeof userWalletAddress !== 'undefined') {
    const userJettonWalletAddress = await jettonMaster.getGetWalletAddress(
      Address.parse(userWalletAddress),
    )

    const userJettonWallet = tonClient.open(
      JettonWalletFeatureRich.fromAddress(userJettonWalletAddress),
    )

    const userJettonData = await userJettonWallet.getGetWalletData()
    userBalance = userJettonData.balance
  }

  // TODO: get actual jetton info here
  onSelect({
    type: 'jetton',
    address,
    balance: userBalance,
    name: parsedData.name!,
    // todo: actual logo
    logo: 'https://raw.githubusercontent.com/tact-lang/tact/refs/heads/main/docs/public/logomark-light.png',
    symbol: parsedData.symbol!,
    vaultAddress: jettonVaultAddr.toString(),
  })
}

const getVaultFromToken = async (tonClient: TonClient, token: Token) => {
  if (token.type === 'ton') {
    return await getTonVault(tonClient)
  }
  if (token.type === 'jetton') {
    return await getJettonVaultFromAddress(tonClient, Address.parse(token.vaultAddress))
  }
}

declare global {
  interface BigInt {
    toJSON(): number
  }
}

BigInt.prototype.toJSON = function () {
  return Number(this)
}

export async function onBalanceInput({
  amount,
  tonConnectUI,
  network,
  fromToken,
  toToken,
  swapType,
  setToAmount,
  setFromAmount,
  slippage = 0.5,
}: {
  amount: string
  tonConnectUI: TonConnectUI
  network: Network
  fromToken: Token
  toToken: Token
  swapType: 'exactIn' | 'exactOut'
  setToAmount?: (amount: string) => void
  setFromAmount?: (amount: string) => void
  slippage?: number
}): Promise<void> {
  const tonClient = getTonClient('testnet')
  const factory = await getFactory(tonClient)

  console.log(`token from: ${JSON.stringify(fromToken)}`)
  console.log(`to from: ${JSON.stringify(toToken)}`)

  const vaultFrom = await getVaultFromToken(tonClient, fromToken)
  const vaultTo = await getVaultFromToken(tonClient, toToken)

  if (!vaultFrom || !vaultTo) {
    console.error('Failed to get pools for tokens')
    return
  }

  const ammPoolAddress = await factory.getAmmPoolAddr(vaultFrom.address, vaultTo.address)

  const ammPool = await getAmmPoolFromAddress(tonClient, ammPoolAddress)

  if (swapType === 'exactIn') {
    // const amountIn = BigInt(amount)
    const amountOut = await ammPool.getExpectedOut(vaultFrom.address, toNano(amount))

    console.log(`Estimated output amount: ${amountOut}`)
    if (setToAmount) setToAmount(fromNano(amountOut))
  }

  if (swapType === 'exactOut') {
    const amountIn = await ammPool.getNeededInToGetX(vaultTo.address, toNano(amount))

    console.log(`Estimated input amount: ${amountIn}`)
    if (setFromAmount) setFromAmount(fromNano(amountIn))
  }
}

export async function getExchangeRate({
  tonConnectUI,
  network,
  fromToken,
  toToken,
}: {
  tonConnectUI: TonConnectUI
  network: Network
  fromToken: Token
  toToken: Token
}): Promise<{ directRate: string; reverseRate: string }> {
  try {
    const isFromTokenValid =
      fromToken.type === 'ton' ||
      (fromToken.type === 'jetton' &&
        fromToken.vaultAddress !== '' &&
        fromToken.address.trim() !== '')
    const isToTokenValid =
      toToken.type === 'ton' ||
      (toToken.type === 'jetton' && toToken.vaultAddress !== '' && toToken.address.trim() !== '')
    console.log(fromToken, toToken)

    if (!isFromTokenValid || !isToTokenValid) {
      return { directRate: '1', reverseRate: '1' }
    }
    const tonClient = getTonClient('testnet')
    const factory = await getFactory(tonClient)

    const vaultFrom = await getVaultFromToken(tonClient, fromToken)
    const vaultTo = await getVaultFromToken(tonClient, toToken)

    if (!vaultFrom || !vaultTo) {
      return { directRate: '1', reverseRate: '1' }
    }

    const ammPoolAddress = await factory.getAmmPoolAddr(vaultFrom.address, vaultTo.address)
    const ammPool = await getAmmPoolFromAddress(tonClient, ammPoolAddress)

    const oneUnit = toNano('1')

    const amountOut = await ammPool.getExpectedOut(vaultFrom.address, oneUnit)
    const directRate = fromNano(amountOut)

    const amountIn = await ammPool.getNeededInToGetX(vaultTo.address, oneUnit)
    const reverseRate = fromNano(amountIn)

    return {
      directRate: parseFloat(directRate).toString(),
      reverseRate: parseFloat(reverseRate).toString(),
    }
  } catch (e) {
    console.error('Error getting exchange rate:', e)
    return { directRate: '1', reverseRate: '1' }
  }
}

export async function fetchTonBalance({
  tonConnectUI,
  network,
  setBalance,
}: {
  tonConnectUI: TonConnectUI
  network: Network
  setBalance: (balance: string) => void
}): Promise<void> {
  try {
    const client = getTonClient(network)
    const address = tonConnectUI.account?.address
    if (!address) return setBalance('0')
    const balance = await client.getBalance(Address.parse(address))
    setBalance(fromNano(balance))
  } catch (e) {
    setBalance('0')
  }
}

export async function handleFromSwapAction(
  tonConnectUI: TonConnectUI,
  fromToken: Token,
  toToken: Token,
  amount: string,
  slippage: number = 0.5,
) {
  const tonClient = getTonClient('testnet')
  const factory = await getFactory(tonClient)

  console.log(`token from: ${JSON.stringify(fromToken)}`)
  console.log(`to from: ${JSON.stringify(toToken)}`)

  const vaultFrom = await getVaultFromToken(tonClient, fromToken)
  const vaultTo = await getVaultFromToken(tonClient, toToken)

  if (!vaultFrom || !vaultTo) {
    console.error('Failed to get pools for tokens')
    return
  }

  const ammPoolAddress = await factory.getAmmPoolAddr(vaultFrom.address, vaultTo.address)

  const ammPool = await getAmmPoolFromAddress(tonClient, ammPoolAddress)

  const amountIn = toNano(amount)

  if (fromToken.type === 'ton') {
    return
  }

  const jettonMaster = tonClient.open(JettonMinter.fromAddress(Address.parse(fromToken.address)))
  const data = await jettonMaster.getGetJettonData()

  const userWalletAddress = tonConnectUI.account?.address
  let userBalance = 0n

  if (typeof userWalletAddress === 'undefined') {
    return
  }
  const userAddress = Address.parse(userWalletAddress)
  const userJettonWalletAddress = await jettonMaster.getGetWalletAddress(userAddress)

  const userJettonWallet = tonClient.open(
    JettonWalletFeatureRich.fromAddress(userJettonWalletAddress),
  )

  const userJettonData = await userJettonWallet.getGetWalletData()
  userBalance = userJettonData.balance
  // check balance if more

  const amountOut = await ammPool.getExpectedOut(vaultFrom.address, amountIn)

  // Apply slippage tolerance to minimum amount out
  const minAmountOut = (amountOut * BigInt(Math.floor((100 - slippage) * 100))) / 10000n
  const swapPayloadCell = createJettonVaultSwapRequest(ammPool.address, false, minAmountOut)
  const transferMsg = beginCell()
    .store(
      storeJettonTransfer({
        $$type: 'JettonTransfer',
        amount: amountIn,
        customPayload: null,
        destination: vaultFrom.address,
        forwardPayload: swapPayloadCell.beginParse(),
        responseDestination: userAddress,
        forwardTonAmount: toNano(0.5),
        queryId: 0n,
      }),
    )
    .endCell()

  await tonConnectUI.sendTransaction({
    messages: [
      {
        payload: transferMsg.toBoc().toString('base64'),
        address: userJettonWallet.address.toString(),
        amount: toNano(1).toString(),
      },
    ],
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
  })

  await waitForSeqno(userAddress, tonClient)
}

export async function handleToSwapAction(
  tonConnectUI: TonConnectUI,
  fromToken: Token,
  toToken: Token,
  amount: string,
  slippage: number = 0.5,
) {
  const tonClient = getTonClient('testnet')
  const factory = await getFactory(tonClient)

  console.log(`token from: ${JSON.stringify(fromToken)}`)
  console.log(`to from: ${JSON.stringify(toToken)}`)

  const vaultFrom = await getVaultFromToken(tonClient, fromToken)
  const vaultTo = await getVaultFromToken(tonClient, toToken)

  if (!vaultFrom || !vaultTo) {
    console.error('Failed to get pools for tokens')
    return
  }

  const ammPoolAddress = await factory.getAmmPoolAddr(vaultFrom.address, vaultTo.address)

  const ammPool = await getAmmPoolFromAddress(tonClient, ammPoolAddress)

  const amountOut = toNano(amount)

  if (fromToken.type === 'ton') {
    return
  }

  const jettonMaster = tonClient.open(JettonMinter.fromAddress(Address.parse(fromToken.address)))
  const data = await jettonMaster.getGetJettonData()

  const userWalletAddress = tonConnectUI.account?.address
  let userBalance = 0n

  if (typeof userWalletAddress === 'undefined') {
    return
  }
  const userAddress = Address.parse(userWalletAddress)
  const userJettonWalletAddress = await jettonMaster.getGetWalletAddress(userAddress)

  const userJettonWallet = tonClient.open(
    JettonWalletFeatureRich.fromAddress(userJettonWalletAddress),
  )

  const userJettonData = await userJettonWallet.getGetWalletData()
  userBalance = userJettonData.balance
  // check balance if more

  const amountIn = await ammPool.getNeededInToGetX(vaultTo.address, amountOut)

  // Apply slippage tolerance to maximum amount in
  const maxAmountIn = (amountIn * BigInt(Math.floor((100 + slippage) * 100))) / 10000n
  const swapPayloadCell = createJettonVaultSwapRequest(ammPool.address, true, amountOut)
  const transferMsg = beginCell()
    .store(
      storeJettonTransfer({
        $$type: 'JettonTransfer',
        amount: maxAmountIn,
        customPayload: null,
        destination: vaultFrom.address,
        forwardPayload: swapPayloadCell.beginParse(),
        responseDestination: userAddress,
        forwardTonAmount: toNano(0.5),
        queryId: 0n,
      }),
    )
    .endCell()

  await tonConnectUI.sendTransaction({
    messages: [
      {
        payload: transferMsg.toBoc().toString('base64'),
        address: userJettonWallet.address.toString(),
        amount: toNano(1).toString(),
      },
    ],
    validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
  })

  await waitForSeqno(userAddress, tonClient)
}
