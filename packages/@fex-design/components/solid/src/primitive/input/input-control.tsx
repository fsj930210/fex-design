import { inputControlClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX } from "solid-js"
import { useInputContext } from "./input-context"

export type InputControlProps = JSX.InputHTMLAttributes<HTMLInputElement>

export function InputControl(props: InputControlProps) {
  const context = useInputContext("InputControl")
  const [local, rest] = splitProps(props, [
    "class",
    "onInput",
    "ref",
    "disabled",
    "readOnly",
    "aria-invalid",
  ])
  return (
    <input
      {...rest}
      ref={(node) => {
        context.setFocusElement(node)
        if (typeof local.ref === "function") local.ref(node)
      }}
      value={context.value()}
      disabled={context.disabled() || local.disabled}
      readOnly={context.readOnly() || local.readOnly}
      aria-invalid={local["aria-invalid"]}
      data-slot="input-control"
      class={cn(inputControlClassName, local.class)}
      onInput={(event) => {
        if (typeof local.onInput === "function") local.onInput(event)
        if (!event.defaultPrevented) context.setValue(event.currentTarget.value, "input", event)
      }}
    />
  )
}
