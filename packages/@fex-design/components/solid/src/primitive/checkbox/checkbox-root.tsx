import { checkboxRootClassName, type CheckboxStyleProps } from "@fex-design/components-styles/checkbox"
import type { CheckboxValue } from "@fex-design/core/checkbox/types"
import { cn } from "@fex-design/utils"
import { createUniqueId, splitProps, type JSX, type ParentProps } from "solid-js"
import { RootContext } from "./checkbox-context"

export interface CheckboxRootProps
  extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>>, CheckboxStyleProps {
  value?: CheckboxValue
  disabled?: boolean
}
export type CheckboxProps = CheckboxRootProps

export function CheckboxRoot(props: CheckboxRootProps) {
  const [local, rest] = splitProps(props, ["value", "disabled", "size", "class", "children"])
  const controlId = createUniqueId()
  return (
    <RootContext.Provider value={{ controlId, value: local.value, disabled: local.disabled }}>
      <div
        {...rest}
        data-slot="checkbox-root"
        data-size={local.size ?? "md"}
        class={cn(checkboxRootClassName({ size: local.size }), local.class)}
      >
        {local.children}
      </div>
    </RootContext.Provider>
  )
}

export { CheckboxRoot as Checkbox }
