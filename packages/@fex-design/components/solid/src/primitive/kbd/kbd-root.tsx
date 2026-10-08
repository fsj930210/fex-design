import { kbdClassName } from "@fex-design/components-styles/kbd"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type KbdProps = ParentProps<JSX.HTMLAttributes<HTMLElement>>
export type KbdRootProps = KbdProps

export function KbdRoot(props: KbdRootProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <kbd {...rest} data-slot="kbd" class={cn(kbdClassName, local.class)}>
      {local.children}
    </kbd>
  )
}

export const Kbd = KbdRoot
