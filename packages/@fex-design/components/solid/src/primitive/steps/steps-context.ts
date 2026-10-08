import { createContext, useContext, type Accessor } from 'solid-js'
import { createStepsController } from '@fex-design/core/steps/create-steps-controller'
import type { StepsOrientation, StepStatus, StepValue } from '@fex-design/core/steps/types'

export interface StepsContextValue {
  controller: ReturnType<typeof createStepsController>
  snapshot: Accessor<{ current: StepValue | undefined; revision: number }>
  orientation: () => StepsOrientation
  navigation: () => boolean
  elements: Map<StepValue, HTMLElement>
  syncOrder: () => void
}

export const StepsContext = createContext<StepsContextValue>()

export interface StepContextValue {
  info: Accessor<{ status: StepStatus }>
  position: Accessor<number>
}

export const StepContext = createContext<StepContextValue>()

export function useStepsContext(name: string) {
  const value = useContext(StepsContext)
  if (!value) throw new Error(`${name} must be used inside Steps.`)
  return value
}

export function useStepContext(name: string) {
  const value = useContext(StepContext)
  if (!value) throw new Error(`${name} must be used inside Step.`)
  return value
}
