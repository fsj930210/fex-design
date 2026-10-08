import { radioButtonClassName, type RadioButtonStyleProps } from "@fex-design/components-styles/radio"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"
import { useRadioContext, type RadioValue } from "./radio-context"

export interface RadioButtonProps
  extends
    ParentProps<
      Omit<
        JSX.ButtonHTMLAttributes<HTMLButtonElement>,
        "defaultValue" | "onChange" | "type" | "value"
      >
    >,
    RadioButtonStyleProps {
  value: RadioValue
}

export function RadioButton(props: RadioButtonProps) {
  const context = useRadioContext("RadioButton")
  const [local, rest] = splitProps(props, [
    "value",
    "disabled",
    "size",
    "class",
    "children",
    "onClick",
  ])
  const checked = () => context.value() === local.value
  const currentDisabled = () => context.disabled() || local.disabled === true
  const size = () => local.size ?? "md"

  return (
    <button
      {...rest}
      type="button"
      role="radio"
      disabled={currentDisabled()}
      aria-checked={checked()}
      data-slot="radio-button"
      data-state={checked() ? "checked" : "unchecked"}
      data-disabled={currentDisabled() ? "true" : undefined}
      data-value={local.value}
      class={cn(radioButtonClassName({ size: size() }), local.class)}
      onClick={(event) => {
        if (typeof local.onClick === "function") {
          local.onClick(event)
        }
        if (event.defaultPrevented || currentDisabled()) return
        context.select(local.value)
      }}
    >
      {local.children}
    </button>
  )
}
