import {
  createTooltip,
  type TooltipOptions,
} from '@fex-design/core/tooltip/create-tooltip'
import {
  createEffect,
  createSignal,
  createUniqueId,
  onCleanup,
  splitProps,
  type ParentProps,
} from 'solid-js'
import { createCoreStoreSignal } from '@fex-design/solid/primitives/create-core-store-signal'
import { TooltipContext } from './tooltip-context'

export interface TooltipRootProps extends ParentProps, TooltipOptions {}

export function TooltipRoot(props: TooltipRootProps) {
  const [local, rest] = splitProps(props, ['children', 'open', 'defaultOpen', 'onOpenChange'])
  const [open, setOpen] = createSignal(local.open ?? local.defaultOpen ?? false)
  let overlay: ReturnType<typeof createTooltip>
  function options(): TooltipOptions {
    return {
      ...rest,
      open: local.open ?? open(),
      onOpenChange(nextOpen, info) {
        if (local.open === undefined) setOpen(nextOpen)
        local.onOpenChange?.(nextOpen, info)
      },
    }
  }
  overlay = createTooltip(options())
  const snapshot = createCoreStoreSignal(overlay)
  const triggerElement = { current: null as HTMLElement | null }
  const contentId = `tooltip-${createUniqueId()}`
  createEffect(() => overlay.setOptions(options()))
  onCleanup(() => overlay.destroy())
  return (
    <TooltipContext.Provider value={{ contentId, overlay, snapshot, triggerElement }}>
      {local.children}
    </TooltipContext.Provider>
  )
}

export { TooltipRoot as Tooltip }
export type TooltipProps = TooltipRootProps
