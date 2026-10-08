import {
  createDrawerController,
  type DrawerOptions,
  type DrawerPlacement,
  type DrawerSize,
} from "@fex-design/core/drawer/create-drawer-controller"
import {
  createSignal,
  onCleanup,
  splitProps,
  useContext,
  type ParentProps,
} from "solid-js"
import { createCoreStoreSignal } from "@fex-design/solid/primitives/create-core-store-signal"
import { DrawerContext } from "./drawer-context"

export interface DrawerProps extends ParentProps, DrawerOptions {
  size?: DrawerSize
  defaultSize?: DrawerSize
  resizable?: boolean
  minSize?: number
  maxSize?: number
  onSizeChange?: (size: number) => void
}
export type DrawerRootProps = DrawerProps

export function Drawer(props: DrawerProps) {
  const parent = useContext(DrawerContext)
  const depth = (parent?.depth ?? -1) + 1
  const [local] = splitProps(props, [
    "children",
    "open",
    "defaultOpen",
    "onOpenChange",
    "placement",
    "mask",
    "modal",
    "dismiss",
    "closeOnMaskPointer",
    "forceMount",
    "closeDelay",
    "size",
    "defaultSize",
    "resizable",
    "minSize",
    "maxSize",
    "onSizeChange",
  ])
  const [open, setOpen] = createSignal(local.open ?? local.defaultOpen ?? false)
  const placement = () => local.placement ?? "right"
  const mask = () => local.mask ?? true
  const triggerElement = { current: null as HTMLButtonElement | null }

  function makeOptions(openValue: boolean): DrawerOptions {
    return {
      open: openValue,
      placement: placement(),
      mask: mask(),
      modal: local.modal,
      dismiss: local.dismiss,
      closeOnMaskPointer: local.closeOnMaskPointer,
      forceMount: local.forceMount,
      closeDelay: local.closeDelay ?? 300,
      onOpenChange(nextOpen, info) {
        if (local.open === undefined) {
          setOpen(nextOpen)
          drawer.setOptions(makeOptions(nextOpen))
        }
        local.onOpenChange?.(nextOpen, info)
      },
    }
  }

  const drawer = createDrawerController(makeOptions(open()))
  const snapshot = createCoreStoreSignal(drawer)

  function syncOptions() {
    drawer.setOptions(makeOptions(local.open ?? open()))
    return null
  }

  onCleanup(() => drawer.destroy())

  return (
    <>
      {syncOptions()}
      <DrawerContext.Provider
        value={{
          drawer,
          snapshot,
          placement,
          mask,
          depth,
          triggerElement,
          resizeOptions: {
            size: () => local.size ?? local.defaultSize,
            resizable: () => local.resizable ?? false,
            minSize: () => local.minSize,
            maxSize: () => local.maxSize,
            onSizeChange: () => local.onSizeChange,
          },
        }}
      >
        {local.children}
      </DrawerContext.Provider>
    </>
  )
}

export { Drawer as DrawerRoot }
