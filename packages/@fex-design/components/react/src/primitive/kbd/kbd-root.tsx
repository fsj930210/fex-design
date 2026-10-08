import { kbdClassName } from "@fex-design/components-styles/kbd"
import { cn } from "@fex-design/utils"
import type { ComponentProps } from "react"

export type KbdProps = ComponentProps<"kbd">
export type KbdRootProps = KbdProps

export function KbdRoot({ className, ...props }: KbdRootProps) {
  return <kbd data-slot="kbd" className={cn(kbdClassName, className)} {...props} />
}

export const Kbd = KbdRoot
