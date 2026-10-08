import { createContextMenuController } from "@fex-design/core/overlay/context-menu/create-context-menu-controller"
import type { ContextMenuOptions } from "@fex-design/core/overlay/context-menu/types"
import { createEffect, createSignal, onCleanup, splitProps, type JSX, type ParentProps } from "solid-js"
import { createCoreStoreSignal } from "@fex-design/solid/primitives/create-core-store-signal"
import { ContextMenuContext } from "./context-menu-context"

export interface ContextMenuProps<T = unknown>
  extends Omit<ParentProps, "children">, Omit<ContextMenuOptions<T>, "onOpenChange"> {
  children: JSX.Element | (() => JSX.Element)
  onOpenChange?: ContextMenuOptions<T>["onOpenChange"]
}
export type ContextMenuRootProps<T = unknown> = ContextMenuProps<T>

function ContextMenuChildren(props: { children: JSX.Element | (() => JSX.Element) }) {
  return typeof props.children === "function" ? props.children() : props.children
}

export function ContextMenu(props: ContextMenuProps<any>) {
  const [local] = splitProps(props, [
    "children",
    "open",
    "defaultOpen",
    "onOpenChange",
    "side",
    "align",
    "sideOffset",
  ])
  const [open, setOpen] = createSignal(local.open ?? local.defaultOpen ?? false)
  const controller = createContextMenuController<any>({
    ...props,
    open: open(),
    side: local.side ?? "right",
    align: local.align ?? "start",
    sideOffset: local.sideOffset ?? 2,
    onOpenChange(nextOpen, info) {
      if (local.open === undefined) setOpen(nextOpen)
      local.onOpenChange?.(nextOpen, info)
    },
  })
  createEffect(() =>
    controller.setOptions({
      ...props,
      open: local.open ?? open(),
      side: local.side ?? "right",
      align: local.align ?? "start",
      sideOffset: local.sideOffset ?? 2,
      onOpenChange(nextOpen, info) {
        if (local.open === undefined) setOpen(nextOpen)
        local.onOpenChange?.(nextOpen, info)
      },
    }),
  )
  const snapshot = createCoreStoreSignal(controller)
  onCleanup(() => controller.destroy())
  return (
    <ContextMenuContext.Provider value={{ controller, snapshot }}>
      <ContextMenuChildren children={props.children} />
    </ContextMenuContext.Provider>
  )
}

export { ContextMenu as ContextMenuRoot }
