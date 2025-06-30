import { TonConnectUI } from '@tonconnect/ui-react'
import { Network } from '../components/NetworkSwitcher'
import { getTonClient } from './client'
import {
  getAmmPoolFromAddress,
  getFactory,
  getJettonVaultFromAddress,
  getTonVault,
} from './dex-factory'
import { Address, fromNano, TonClient } from '@ton/ton'
import { JettonMinterFeatureRich } from './wrappers/FeatureRich_JettonMinterFeatureRich'
import { JettonWalletFeatureRich } from './wrappers/FeatureRich_JettonWalletFeatureRich'
import { parseMetadataFromCell } from './jetton-helpers'

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
    userBalance = BigInt(fromNano(userJettonData.balance))
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
}: {
  amount: string
  tonConnectUI: TonConnectUI
  network: Network
  fromToken: Token
  toToken: Token
  swapType: 'exactIn' | 'exactOut'
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
    const amountIn = BigInt(amount)
    const amountOut = await ammPool.getExpectedOut(vaultFrom.address, BigInt(amountIn))

    console.log(`Estimated output amount: ${amountOut}`)
    // set toAmount(amountOut.toString())
  }

  if (swapType === 'exactOut') {
    const amountOut = BigInt(amount)
    const amountIn = await ammPool.getNeededInToGetX(vaultTo.address, BigInt(amountOut))

    console.log(`Estimated input amount: ${amountIn}`)
    // set fromAmount(amountIn.toString())
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
    const client = await getTonClient(network)
    const address = tonConnectUI.account?.address
    if (!address) return setBalance('0')
    const balance = await client.getBalance(Address.parse(address))
    setBalance(fromNano(balance))
  } catch (e) {
    setBalance('0')
  }
}
