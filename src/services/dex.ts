import { Address, TonClient } from '@ton/ton'
import { Factory } from './wrappers/DEX_Factory'

const DEX_FACTORY_ADDRESS = Address.parse(
  'EQDFPTYGl95U6d8BorOCzgCNC6m9hkdipv6fNXxOxn9SnHtW',
)

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
