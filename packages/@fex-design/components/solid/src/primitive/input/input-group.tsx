import { inputGroupClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"

export type InputGroupProps = ParentProps<JSX.HTMLAttributes<HTMLDivElement>>

export function InputGroup(props: InputGroupProps) {
  const [local, rest] = splitProps(props, ["class", "children"])
  return (
    <div
      {...rest}
      role="group"
      data-slot="input-group"
      class={cn(inputGroupClassName, local.class)}
    >
      {local.children}
    </div>
  )
}
