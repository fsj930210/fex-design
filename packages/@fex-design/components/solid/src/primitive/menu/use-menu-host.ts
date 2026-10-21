import { createEffect, onCleanup, untrack } from 'solid-js'
import { useMenuContext } from './context'
export function useMenuHost(bind: (element: HTMLElement) => () => void, track: () => unknown) {
  const dom = useMenuContext()
  let stop: (() => void) | undefined
  onCleanup(() => stop?.())
  // Consumer props update the registered DOM boundary without recreating its host.
  createEffect(() => {
    track()
    untrack(() => dom.refresh())
  })
  return (element: HTMLElement) => {
    stop?.()
    stop = bind(element)
  }
}
