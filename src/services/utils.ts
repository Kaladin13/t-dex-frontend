import { Address, TonClient } from '@ton/ton'
import { TonConnectUI } from '@tonconnect/ui-react'
import { Network } from '../components/NetworkSwitcher'

async function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export async function waitForContractDeploy(address: Address, client: TonClient) {
  let isDeployed = false
  let maxTries = 15
  while (!isDeployed && maxTries > 0) {
    maxTries--
    isDeployed = await client.isContractDeployed(address)
    if (isDeployed) return
    await sleep(3000)
  }

  throw new Error('Transaction failed!')
}

const getSeqno = async (walletAddress: Address, client: TonClient) => {
  const stack = await client.runMethod(walletAddress, `seqno`)
  return stack.stack.readBigNumber()
}

export async function waitForSeqno(walletAddress: Address, client: TonClient) {
  const seqnoBefore = await getSeqno(walletAddress, client)

  return async () => {
    for (let attempt = 0; attempt < 15; attempt++) {
      await sleep(2500)
      const seqnoAfter = await getSeqno(walletAddress, client)
      if (seqnoAfter > seqnoBefore) return
    }
    throw new Error('Timeout waiting for seqno!')
  }
}

// Mock: called when user inputs a jetton address
export function onJettonAddressInput({
  address,
  tonConnectUI,
  network,
  extra,
}: {
  address: string;
  tonConnectUI: TonConnectUI;
  network: Network;
  extra?: any;
}) {
  // You can implement fetching metadata, validation, etc. here
  console.log('onJettonAddressInput', { address, tonConnectUI, network, extra });
}

// Mock: called when user inputs a balance/amount
export function onBalanceInput({
  amount,
  token,
  tonConnectUI,
  network,
  extra,
}: {
  amount: string;
  token: any;
  tonConnectUI: TonConnectUI;
  network: Network;
  extra?: any;
}) {
  // You can implement balance checks, quote fetching, etc. here
  console.log('onBalanceInput', { amount, token, tonConnectUI, network, extra });
}
