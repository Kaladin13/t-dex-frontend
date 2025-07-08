import React from 'react'
import { SWAP_STEPS, SwapStepId, SwapStepStatus } from '../constants/swapSteps'
import './SwapProgress.css'

type SwapProgressProps = {
  isOpen: boolean
  onClose: () => void
  currentStep: SwapStepId
  stepStatuses: Record<SwapStepId, SwapStepStatus>
  fromTokenSymbol?: string
  toTokenSymbol?: string
  amount?: string
  fromAmount?: string
  toAmount?: string
}

const SwapProgress: React.FC<SwapProgressProps> = ({
  isOpen,
  onClose,
  currentStep,
  stepStatuses,
  fromTokenSymbol,
  toTokenSymbol,
  amount,
  fromAmount,
  toAmount,
}) => {
  if (!isOpen) return null

  const getStepIcon = (stepId: SwapStepId, status: SwapStepStatus) => {
    switch (status) {
      case 'success':
        return '✓'
      case 'error':
        return '✗'
      case 'loading':
        return (
          <div className='spinner'>
            <div className='spinner-ring'></div>
          </div>
        )
      default:
        return SWAP_STEPS.findIndex((step) => step.id === stepId) + 1
    }
  }

  const isCompleted = SWAP_STEPS.every((step) => stepStatuses[step.id] === 'success')
  const hasError = SWAP_STEPS.some((step) => stepStatuses[step.id] === 'error')

  return (
    <div className='swap-progress-overlay'>
      <div className='swap-progress-modal'>
        <div className='swap-progress-header'>
          <h3 className='swap-progress-title'>
            {isCompleted ? 'Swap Completed!' : hasError ? 'Swap Failed' : 'Processing Swap'}
          </h3>
          {fromTokenSymbol && toTokenSymbol && (fromAmount || toAmount) && (
            <p className='swap-progress-subtitle'>
              {fromAmount && toAmount ? (
                <>
                  Swap {fromAmount} {fromTokenSymbol} to {toAmount} {toTokenSymbol}
                </>
              ) : (
                <>
                  Swap {amount} {fromTokenSymbol} to {toTokenSymbol}
                </>
              )}
            </p>
          )}
        </div>

        <div className='swap-progress-steps'>
          {SWAP_STEPS.map((step) => {
            const status = stepStatuses[step.id]
            return (
              <div
                key={step.id}
                className={`swap-progress-step ${status}`}
              >
                <div className='swap-progress-step-icon'>{getStepIcon(step.id, status)}</div>
                <div className='swap-progress-step-label'>{step.label}</div>
              </div>
            )
          })}
        </div>

        <button
          className='swap-progress-close'
          onClick={onClose}
          disabled={!isCompleted && !hasError}
        >
          {isCompleted || hasError ? 'Close' : 'Processing...'}
        </button>
      </div>
    </div>
  )
}

export default SwapProgress
