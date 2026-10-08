import type { TourStepOptions } from '@fex-design/core/tour/types'
import { createEffect, onCleanup, Show, type ParentProps } from 'solid-js'
import { useTourContext } from './tour-context'

export interface TourStepProps<TData = unknown> extends ParentProps, TourStepOptions<TData> {}

export function TourStep<TData = unknown>(props: TourStepProps<TData>) {
  const { controller, snapshot } = useTourContext('TourStep')
  createEffect(() => {
    const step: TourStepOptions<TData> = {
      name: props.name,
      target: props.target,
      placement: props.placement,
      arrow: props.arrow,
      mask: props.mask,
      gap: props.gap,
      scrollIntoViewOptions: props.scrollIntoViewOptions,
      disabledInteraction: props.disabledInteraction,
      data: props.data,
    }
    const unregister = controller.registerStep(step)
    onCleanup(unregister)
  })
  return <Show when={snapshot().currentStep?.name === props.name}>{props.children}</Show>
}
