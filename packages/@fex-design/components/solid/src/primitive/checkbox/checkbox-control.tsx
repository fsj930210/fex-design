import { checkboxControlClassName } from "@fex-design/components-styles/checkbox"
import type { CheckboxValue } from "@fex-design/core/checkbox/types"
import { cn } from "@fex-design/utils"
import { createEffect, splitProps, useContext, type JSX } from "solid-js"
import { GroupContext, RootContext } from "./checkbox-context"

export interface CheckboxControlProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "value"
> {
  value?: CheckboxValue
  indeterminate?: boolean
}

export function CheckboxControl(props: CheckboxControlProps) {
  const root = useContext(RootContext)
  const group = useContext(GroupContext)
  const [local, rest] = splitProps(props, [
    "id",
    "value",
    "checked",
    "disabled",
    "name",
    "indeterminate",
    "class",
    "onChange",
    "ref",
  ])
  let input!: HTMLInputElement
  const currentValue = () => local.value ?? root?.value
  const inGroup = () => group !== undefined && currentValue() !== undefined
  createEffect(() => {
    if (input) input.indeterminate = Boolean(local.indeterminate)
  })
  return (
    <input
      {...rest}
      ref={(node) => {
        input = node
        if (typeof local.ref === "function") local.ref(node)
      }}
      id={local.id ?? root?.controlId}
      type="checkbox"
      name={local.name}
      value={currentValue()}
      checked={inGroup() ? group!.value().includes(currentValue()!) : local.checked}
      disabled={Boolean(local.disabled || root?.disabled || group?.disabled())}
      data-slot="checkbox-control"
      class={cn(checkboxControlClassName, local.class)}
      onChange={(event) => {
        if (typeof local.onChange === "function") local.onChange(event)
        if (!event.defaultPrevented && inGroup()) group!.toggle(currentValue()!)
      }}
    />
  )
}
