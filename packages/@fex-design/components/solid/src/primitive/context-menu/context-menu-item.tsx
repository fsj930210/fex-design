import type { JSX, ParentProps } from "solid-js"
import { useContextMenuContext } from "./context-menu-context"

export type ContextMenuItemProps = ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>

export function ContextMenuItem(props: ContextMenuItemProps) {
  const context = useContextMenuContext("ContextMenuItem")
  return (
    <button
      {...props}
      type={props.type ?? "button"}
      role={props.role ?? "menuitem"}
      onClick={(event) => {
        const click = props.onClick
        if (typeof click === "function") click(event)
        if (!event.defaultPrevented) {
          context.controller.overlay.close({ reason: "manual", source: "menu-item", event })
        }
      }}
    >
      {props.children}
    </button>
  )
}
