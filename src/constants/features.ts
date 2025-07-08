export interface JettonFeatures {
  mintable: boolean
  burnable: boolean
  sharded: boolean
  onchainApi: boolean
  jettonSendMode: boolean
  governance: boolean
}

export const defaultFeatures: JettonFeatures = {
  mintable: true,
  burnable: false,
  sharded: true,
  onchainApi: false,
  jettonSendMode: false,
  governance: false,
}

export type FeatureId = keyof JettonFeatures

interface InfoText {
  text: string
  linkText: string
  linkUrl: string
}

export interface Feature {
  id: FeatureId
  label: string
  description: string
  infoText?: InfoText
}

export const featuresList: Feature[] = [
  {
    id: 'mintable',
    label: 'Mintable',
    description: 'Allow minting of new tokens after deployment and initial mint',
    infoText: {
      text: 'This feature allows you to mint additional tokens after the initial deployment. You can control the minting process through smart contract interactions.',
      linkText: 'Learn more about minting',
      linkUrl: 'https://docs.ton.org/develop/smart-contracts/tutorials/jetton-wallet',
    },
  },
  {
    id: 'onchainApi',
    label: 'On-chain API',
    description: 'Enable on-chain balance API for smart contract interactions',
    infoText: {
      text: 'Enables smart contracts to query jetton balances directly on-chain. Useful for DeFi applications and complex smart contract interactions.',
      linkText: 'On-chain integration examples',
      linkUrl: 'https://github.com/tact-lang/jetton/blob/main/dev-docs/SPEC.md',
    },
  },
  {
    id: 'sharded',
    label: 'Sharded',
    description: 'Enable sharding for jettons',
    infoText: {
      text: 'Sharding reduces the number of cross-shard hops by deploying the jetton wallet on the same shard as the owner.',
      linkText: 'Read about sharding',
      linkUrl: 'https://docs.ton.org/v3/concepts/dive-into-ton/ton-blockchain/sharding',
    },
  },
  {
    id: 'jettonSendMode',
    label: 'Jetton Send Mode',
    description: 'Configure custom send modes for jetton transfers',
    infoText: {
      text: 'Allows you to customize how jetton transfers and notifications are send',
      linkText: 'Send modes guide',
      linkUrl: 'https://github.com/tact-lang/jetton/blob/main/dev-docs/SPEC.md',
    },
  },
]
