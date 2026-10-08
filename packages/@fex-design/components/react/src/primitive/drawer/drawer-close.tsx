import { drawerCloseClassName } from "@fex-design/components-styles/drawer"
import { cn } from "@fex-design/utils"
import { use, type ComponentProps, type MouseEvent } from "react"
import { XIcon } from "@fex-design/react/icons/x"
import { DrawerContext } from "./drawer-context"

export type DrawerCloseProps = ComponentProps<"button">

export function DrawerClose({
  children,
  className,
  onClick,
  "aria-label": ariaLabel = "Close",
  ...props
}: DrawerCloseProps) {
  const context = use(DrawerContext)
  if (!context) throw new Error("DrawerClose must be used inside DrawerRoot")
  const { drawer } = context
  const content =
    children === "×" || children === "✕" ? (
      <XIcon className="size-4" />
    ) : (
      (children ?? <XIcon className="size-4" />)
    )
  return (
    <button
      {...props}
      type="button"
      aria-label={ariaLabel}
      data-slot="drawer-close"
      className={cn(drawerCloseClassName, className)}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        onClick?.(e)
        if (!e.defaultPrevented) drawer.close({ source: "close-button", event: e.nativeEvent })
      }}
    >
      {content}
    </button>
  )
}
