import { inputClearClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"
import { CircleXIcon } from "@fex-design/solid/icons/circle-x"
import { useInputContext } from "./input-context"

export type InputClearProps = ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>

export function InputClear(props: InputClearProps) {
  const context = useInputContext("InputClear")
  const [local, rest] = splitProps(props, ["class", "children", "onClick"])
  return (
    <button
      {...rest}
      type="button"
      data-slot="input-clear"
      class={cn(inputClearClassName, local.class)}
      onClick={(event) => {
        if (typeof local.onClick === "function") local.onClick(event)
        if (!event.defaultPrevented) context.clear()
      }}
    >
      {local.children ?? <CircleXIcon />}
    </button>
  )
}
