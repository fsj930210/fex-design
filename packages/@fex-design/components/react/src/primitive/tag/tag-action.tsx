import { tagActionClassName } from "@fex-design/components-styles/tag"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"
import { XIcon } from "@fex-design/react/icons/x"

export interface TagActionProps extends ComponentProps<"button"> {}

export function TagAction({
  type = "button",
  "aria-label": ariaLabel,
  className,
  children,
  ...props
}: TagActionProps) {
  return (
    <button
      {...props}
      type={type}
      aria-label={ariaLabel}
      data-slot="tag-action"
      className={cn(tagActionClassName, className)}
    >
      {children ?? <XIcon aria-hidden />}
    </button>
  )
}
