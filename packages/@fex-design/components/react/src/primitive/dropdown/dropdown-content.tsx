import { PopoverContent, type PopoverContentProps } from "../popover"
import { popoverMenuContentClassName } from "@fex-design/components-styles/popover"
import { cn } from "@fex-design/utils"
import { usePopoverContext } from "../popover/popover-context"

export type DropdownContentProps = PopoverContentProps

export function DropdownContent(props: DropdownContentProps) {
  const { hoverAncestors, overlay } = usePopoverContext("DropdownContent")
  return (
    <PopoverContent
      {...props}
      className={cn(popoverMenuContentClassName, props.className)}
      role={props.role ?? "menu"}
      onClick={(event) => {
        props.onClick?.(event)
        const item =
          event.target instanceof Element
            ? event.target.closest<HTMLElement>("[role=\"menuitem\"]")
            : null
        if (!event.defaultPrevented && item && !item.hasAttribute("aria-haspopup")) {
          ;[...hoverAncestors, overlay]
            .reverse()
            .forEach((current) =>
              current.close({ reason: "manual", source: "menu-item", event: event.nativeEvent }),
            )
        }
      }}
    />
  )
}
