import { getHttpEndpoint } from '@orbs-network/ton-access'
import { TonClient } from '@ton/ton'
import { Network } from '../components/NetworkSwitcher'

let client: TonClient | null = null

export const getTonClient = (network: Network) => {
  if (client) {
    return client
  } else {
    client = new TonClient({
      endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
      apiKey: '0a5ed4bac006e02ff45b9978049612c0b73d3e60962ae8dfffd106d0ff90bbeb',
    })

    return client
  }
}
