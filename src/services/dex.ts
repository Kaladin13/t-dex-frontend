import { TonConnectUI } from '@tonconnect/ui-react'
import { Network } from '../components/NetworkSwitcher'
import { getTonClient } from './client'
import { getFactory } from './dex-factory'
import { Address } from '@ton/core'
import { JettonMinterFeatureRich } from './wrappers/FeatureRich_JettonMinterFeatureRich'
import { JettonWalletFeatureRich } from './wrappers/FeatureRich_JettonWalletFeatureRich'
import { parseMetadataFromCell } from './jetton-helpers'

type TonToken = {
  type: 'ton'
  symbol: string
  name: string
  logo: string
  balance: number
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
    logo: parsedData.image!,
    symbol: parsedData.symbol!,
    vaultAddress: jettonVaultAddr.toString(),
  })
}

const handleExactIn = async () => {}

export async function onBalanceInput({
  amount,
  swapType,
  tonConnectUI,
  network,
  fromToken,
  toToken,
}: {
  swapType: 'exactIn' | 'exactOut'
  amount: string
  tonConnectUI: TonConnectUI
  network: Network
  fromToken: Token
  toToken: Token
}): Promise<void> {
  // Simulate async work
  if (swapType === 'exactIn') {
  }

  if (fromToken?.type === 'jetton') {
    // Here you would typically call a function to handle the jetton balance input
    console.log(`Handling jetton balance input for ${token.symbol} at address ${token?.name}`)
  }
  if (token.type === 'ton') {
    // Here you would typically call a function to handle the TON balance input
    console.log(`Handling TON balance input for ${token.symbol}`)
  }
}
