import { createStepsController } from '@fex-design/core/steps/create-steps-controller'
import {
  deserializeStepValue,
  type StepsChangeMeta,
  type StepsOrientation,
  type StepValue,
} from '@fex-design/core/steps/types'
import { stepsClassName } from '@fex-design/components-styles/steps'
import { cn } from '@fex-design/utils'
import {
  createEffect,
  splitProps,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { StepsContext } from './steps-context'

export interface StepsProps extends ParentProps<
  Omit<JSX.OlHTMLAttributes<HTMLOListElement>, 'onChange'>
> {
  current?: StepValue
  defaultCurrent?: StepValue
  navigation?: boolean
  orientation?: StepsOrientation
  responsive?: boolean
  onChange?: (value: StepValue, meta: StepsChangeMeta) => void
}

export function Steps(props: StepsProps) {
  const [local, rest] = splitProps(props, [
    'current',
    'defaultCurrent',
    'navigation',
    'orientation',
    'responsive',
    'onChange',
    'class',
    'children',
  ])
  const controller = createStepsController({
    get current() {
      return local.current
    },
    get defaultCurrent() {
      return local.defaultCurrent
    },
    get navigation() {
      return local.navigation
    },
    onChange: (value, meta) => local.onChange?.(value, meta),
  })
  const snapshot = createCoreStoreSignal(controller)
  createEffect(() =>
    controller.updateOptions({
      current: local.current,
      defaultCurrent: local.defaultCurrent,
      navigation: local.navigation,
      onChange: (value, meta) => local.onChange?.(value, meta),
    }),
  )
  const orientation = () => local.orientation ?? 'horizontal'
  const elements = new Map<StepValue, HTMLElement>()
  let rootElement: HTMLOListElement | undefined
  const syncOrder = () => {
    if (rootElement)
      controller.setOrder(
        [...rootElement.querySelectorAll<HTMLElement>('[data-step-value]')]
          .filter((element) => element.closest('[data-slot="steps"]') === rootElement)
          .map((element) => deserializeStepValue(element.dataset.stepValue ?? 's:')),
      )
  }
  return (
    <StepsContext.Provider
      value={{
        controller,
        snapshot,
        orientation,
        navigation: () => local.navigation === true,
        elements,
        syncOrder,
      }}
    >
      <ol
        {...rest}
        ref={rootElement}
        data-slot="steps"
        data-orientation={orientation()}
        class={cn(
          stepsClassName({ orientation: orientation(), responsive: local.responsive ?? true }),
          local.class,
        )}
      >
        {local.children}
      </ol>
    </StepsContext.Provider>
  )
}

export { Steps as StepsRoot, type StepsProps as StepsRootProps }
