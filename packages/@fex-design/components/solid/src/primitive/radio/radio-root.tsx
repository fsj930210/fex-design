import { radioIndicatorClassName, radioRootClassName, type RadioStyleProps } from "@fex-design/components-styles/radio"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"
import { useRadioContext, type RadioValue } from "./radio-context"

export interface RadioProps
  extends
    ParentProps<
      Omit<
        JSX.ButtonHTMLAttributes<HTMLButtonElement>,
        "defaultValue" | "onChange" | "type" | "value"
      >
    >,
    RadioStyleProps {
  value: RadioValue
}
export type RadioRootProps = RadioProps

export function Radio(props: RadioProps) {
  const context = useRadioContext("Radio")
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
      data-slot="radio"
      data-state={checked() ? "checked" : "unchecked"}
      data-disabled={currentDisabled() ? "true" : undefined}
      data-value={local.value}
      class={cn(radioRootClassName({ size: size() }), local.class)}
      onClick={(event) => {
        if (typeof local.onClick === "function") {
          local.onClick(event)
        }
        if (event.defaultPrevented || currentDisabled()) return
        context.select(local.value)
      }}
    >
      {checked() ? <span data-slot="radio-indicator" class={radioIndicatorClassName} /> : null}
      {local.children}
    </button>
  )
}

export { Radio as RadioRoot }
