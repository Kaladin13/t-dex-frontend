const SWAP_STEPS = [
  {
    id: 'prepare',
    label: 'Preparing swap transaction',
    status: 'pending',
  },
  {
    id: 'confirm',
    label: 'Confirming and sending transaction',
    status: 'pending',
  },
  {
    id: 'execute-asset-send',
    label: 'Executing asset transfer',
    status: 'pending',
  },
  {
    id: 'execute-asset-payout',
    label: 'Executing asset payout',
    status: 'pending',
  },
] as const

type SwapStepId = (typeof SWAP_STEPS)[number]['id']
type SwapStepStatus = 'pending' | 'loading' | 'success' | 'error'

export { SWAP_STEPS }
export type { SwapStepId, SwapStepStatus }
