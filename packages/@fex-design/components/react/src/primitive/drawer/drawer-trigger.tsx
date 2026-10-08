import { use, type ComponentProps, type ReactNode, type Ref } from "react"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { DrawerContext } from "./drawer-context"

export interface DrawerTriggerProps extends Omit<ComponentProps<"button">, "children" | "ref"> {
  children: (props: ComponentProps<"button"> & { "data-state": string }) => ReactNode
  ref?: Ref<HTMLButtonElement>
}

export function DrawerTrigger({ children, onClick, ref, ...props }: DrawerTriggerProps) {
  const context = use(DrawerContext)
  if (!context) throw new Error("DrawerTrigger must be used inside DrawerRoot")
  const { drawer, triggerRef } = context
  const snapshot = useCoreStore(drawer)
  return children({
    ...props,
    ref: (element: HTMLButtonElement | null) => {
      triggerRef.current = element
      if (typeof ref === "function") ref(element)
      else if (ref && "current" in ref) ref.current = element
    },
    "data-state": snapshot.open ? "open" : "closed",
    onClick: (e) => {
      onClick?.(e)
      if (!e.defaultPrevented) drawer.toggle({ source: "trigger" })
    },
  })
}
