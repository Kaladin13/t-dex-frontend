import { Address, TonClient } from '@ton/ton'
import { Factory } from './wrappers/DEX_Factory'

const DEX_FACTORY_ADDRESS = Address.parse('EQBJiBXaBqHEDO108PBuKxWGseG_tWxeFOwAGRiU4fRGyQmL')

const TON_VAULT_ADDRESS = Address.parse('EQDTsG5OoAbrtTRpYMHlmqDXwI9mj3Iv-wj-NNrNf0BDG-zD')

export const getFactory = async (ton: TonClient) => {
  try {
    const factoryState = await ton.provider(DEX_FACTORY_ADDRESS).getState()

    if (factoryState.state.type === 'uninit') {
      throw new Error('Factory contract is not initialized')
    }

    const factory = ton.open(Factory.fromAddress(DEX_FACTORY_ADDRESS))

    return factory
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    alert('Failed to get DEX factory')
    throw new Error('Failed to get DEX factory')
  }
}

export const getTonVault = async (ton: TonClient) => {
  try {
    const vaultState = await ton.provider(TON_VAULT_ADDRESS).getState()

    if (vaultState.state.type === 'uninit') {
      throw new Error('TON Vault contract is not initialized')
    }

    const tonVault = ton.open(Factory.fromAddress(TON_VAULT_ADDRESS))
    return tonVault
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    alert('Failed to get TON Vault address')
    throw new Error('Failed to get TON Vault address')
  }
}
