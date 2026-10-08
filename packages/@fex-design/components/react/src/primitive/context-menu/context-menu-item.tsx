import type { ComponentProps } from "react"
import { useContextMenuContext } from "./context-menu-context"

export type ContextMenuItemProps = ComponentProps<"button">

export function ContextMenuItem(props: ContextMenuItemProps) {
  const { controller } = useContextMenuContext("ContextMenuItem")
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      role={props.role ?? "menuitem"}
      onClick={(event) => {
        props.onClick?.(event)
        if (!event.defaultPrevented)
          controller.overlay.close({
            reason: "manual",
            source: "menu-item",
            event: event.nativeEvent,
          })
      }}
    />
  )
}
