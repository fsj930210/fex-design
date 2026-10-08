import { tourControlClassName } from '@fex-design/components-styles/tour'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { useTourContext } from './tour-context'

export type TourAction = 'previous' | 'next' | 'skip' | 'close' | 'complete'

export interface TourControlProps {
  action: TourAction
  class?: string
  disabled?: boolean
  children?: JSX.Element
}

export function TourControl(props: TourControlProps) {
  const { controller, snapshot } = useTourContext('TourControl')
  const disabled = () =>
    Boolean(props.disabled || (props.action === 'previous' && snapshot().isFirst))
  function click() {
    if (disabled()) return
    if (props.action === 'previous') void controller.previous()
    else if (props.action === 'next') void controller.next()
    else if (props.action === 'skip') controller.skip()
    else if (props.action === 'close') controller.close()
    else controller.complete()
  }
  return (
    <button
      type="button"
      disabled={disabled()}
      data-tour-action={props.action}
      class={cn(tourControlClassName, props.class)}
      onClick={click}
    >
      {props.children}
    </button>
  )
}
