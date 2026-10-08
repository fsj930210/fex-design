import type { StepRecord } from '@fex-design/core/steps/types'
import {
  stepClassName,
} from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import type { HTMLAttributes, KeyboardEvent, MouseEvent, ReactNode, Ref } from 'react'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { StepContext, useStepsContext } from './steps-context'

export interface StepProps<TData = unknown>
  extends Omit<HTMLAttributes<HTMLLIElement>, 'children'>, StepRecord<TData> {
  children?: ReactNode
}

export function Step<TData = unknown>({
  value,
  disabled,
  status,
  data,
  children,
  className,
  onClick,
  onKeyDown,
  ref,
  ...props
}: StepProps<TData> & { ref?: Ref<HTMLLIElement> }) {
  const steps = useStepsContext('Step')
  const result = steps.getStepProps({ value, disabled, status, data })
  const composedRef = useComposedRef(result.props.ref, ref)
  return (
    <StepContext value={{ status: result.info.status, position: result.position }}>
      <li
        {...props}
        {...result.props}
        ref={composedRef}
        className={cn(stepClassName, className)}
        onClick={(event: MouseEvent<HTMLLIElement>) => {
          onClick?.(event)
          if (!event.defaultPrevented) result.props.onClick(event)
        }}
        onKeyDown={(event: KeyboardEvent<HTMLLIElement>) => {
          onKeyDown?.(event)
          if (!event.defaultPrevented) result.props.onKeyDown(event)
        }}
      >
        {children}
      </li>
    </StepContext>
  )
}

export { Step as StepItem, type StepProps as StepItemProps }
