import { createMemo, type ParentProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import { useTourContext } from './tour-context'

export interface TourPortalProps extends ParentProps {
  container?: HTMLElement | null | undefined
}

export function TourPortal(props: TourPortalProps) {
  const { controller, snapshot, getPopupContainer } = useTourContext('TourPortal')
  const target = createMemo(() =>
    snapshot().currentStep?.target ? controller.getTarget(snapshot().currentStep!.target!) : null,
  )
  return (
    <Portal mount={props.container ?? getPopupContainer?.(target()) ?? document.body}>
      {props.children}
    </Portal>
  )
}
