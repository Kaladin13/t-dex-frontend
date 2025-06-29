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
      apiKey: 'ab70221ff1418fc7d9f931cf4d3220041fac2a7be6dc4bfc78ea070bb4ef5606',
    })

    return client
  }
}
