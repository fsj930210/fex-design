import { kbdGroupClassName } from "@fex-design/components-styles/kbd"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { splitProps } from "solid-js"

export type KbdGroupProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function KbdGroup(props: KbdGroupProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div {...rest} data-slot="kbd-group" class={cn(kbdGroupClassName, local.class)}>
      {local.children}
    </div>
  )
}
