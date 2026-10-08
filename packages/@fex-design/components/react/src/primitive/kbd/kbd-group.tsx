import { kbdGroupClassName } from "@fex-design/components-styles/kbd"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type KbdGroupProps = ComponentProps<"div">

export function KbdGroup({ className, ...props }: KbdGroupProps) {
  return <div data-slot="kbd-group" className={cn(kbdGroupClassName, className)} {...props} />
}
