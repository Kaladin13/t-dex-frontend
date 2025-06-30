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
    })

    return client
  }
}
