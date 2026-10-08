import type { createTourController } from '@fex-design/core/tour/create-tour-controller'
import { onCleanup, type JSX } from 'solid-js'
import { useTourContext } from './tour-context'

export interface TourTargetProps {
  name: string
  children: (props: {
    ref: (element: HTMLElement) => void
    state: ReturnType<ReturnType<typeof createTourController>['getSnapshot']>
    props: { 'data-tour-target': string }
  }) => JSX.Element
}

export function TourTarget(props: TourTargetProps) {
  const { controller, snapshot } = useTourContext('TourTarget')
  let element: HTMLElement | null = null
  const unregister = controller.registerTarget(props.name, () => element)
  onCleanup(() => {
    unregister()
    controller.refreshTarget()
  })
  return props.children({
    ref: (value: HTMLElement) => {
      element = value
      controller.refreshTarget()
    },
    state: snapshot,
    props: { 'data-tour-target': props.name },
  })
}
