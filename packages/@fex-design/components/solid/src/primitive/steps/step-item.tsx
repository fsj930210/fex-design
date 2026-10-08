import {
  serializeStepValue,
  type StepRecord,
} from '@fex-design/core/steps/types'
import { stepClassName } from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  createMemo,
  onCleanup,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { StepContext, useStepsContext } from './steps-context'

export interface StepProps extends ParentProps<JSX.LiHTMLAttributes<HTMLLIElement>>, StepRecord {}

export function Step(props: StepProps) {
  const [local, rest] = splitProps(props, [
    'value',
    'disabled',
    'status',
    'data',
    'class',
    'children',
  ])
  const root = useStepsContext('Step')
  let element: HTMLLIElement | undefined
  root.controller.registerStep({
    value: local.value,
    disabled: local.disabled,
    status: local.status,
    data: local.data,
  })
  createEffect(() => {
    root.controller.registerStep({
      value: local.value,
      disabled: local.disabled,
      status: local.status,
      data: local.data,
    })
    if (element) {
      root.elements.set(local.value, element)
      root.syncOrder()
    }
  })
  onCleanup(() => {
    root.elements.delete(local.value)
    root.controller.unregisterStep(local.value)
    root.syncOrder()
  })
  const info = createMemo(() => {
    root.snapshot().revision
    return (
      root.controller.getStepInfo(local.value) ?? {
        value: local.value,
        status: local.status ?? 'wait',
        disabled: local.disabled === true,
      }
    )
  })
  const position = createMemo(() => {
    root.snapshot().revision
    return Math.max(1, root.controller.getPosition(local.value) + 1)
  })
  const keydown: JSX.EventHandler<HTMLLIElement, KeyboardEvent> = (event) => {
    if (!root.navigation() || info().disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      root.controller.select(local.value, 'keyboard')
      return
    }
    const horizontal = root.orientation() === 'horizontal'
    const direction =
      event.key === 'Home'
        ? 'first'
        : event.key === 'End'
          ? 'last'
          : event.key === (horizontal ? 'ArrowRight' : 'ArrowDown')
            ? 'next'
            : event.key === (horizontal ? 'ArrowLeft' : 'ArrowUp')
              ? 'previous'
              : undefined
    if (direction) {
      event.preventDefault()
      const value = root.controller.move(local.value, direction)
      if (value !== undefined) {
        root.elements.get(value)?.focus()
        root.controller.select(value, 'keyboard')
      }
    }
  }
  return (
    <StepContext.Provider value={{ info, position }}>
      <li
        {...rest}
        ref={(node) => {
          element = node
          root.elements.set(local.value, node)
          root.syncOrder()
          queueMicrotask(root.syncOrder)
        }}
        data-step-value={serializeStepValue(local.value)}
        class={cn(stepClassName, local.class)}
        role={root.navigation() ? 'button' : undefined}
        tabIndex={
          root.navigation() && !info().disabled
            ? root.snapshot().current === local.value
              ? 0
              : -1
            : undefined
        }
        aria-current={root.snapshot().current === local.value ? 'step' : undefined}
        aria-disabled={info().disabled || undefined}
        data-status={info().status}
        data-disabled={info().disabled || undefined}
        data-navigation={root.navigation() || undefined}
        onClick={() => root.controller.select(local.value, 'pointer')}
        onKeyDown={keydown}
      >
        {local.children}
      </li>
    </StepContext.Provider>
  )
}

export { Step as StepItem, type StepProps as StepItemProps }
