import { checkboxRootClassName, type CheckboxStyleProps } from "@fex-design/components-styles/checkbox"
import type { CheckboxValue } from "@fex-design/core/checkbox/types"
import { cn } from "@fex-design/utils"
import { useId, type HTMLAttributes, type Ref } from "react"
import { RootContext } from "./checkbox-context"

export interface CheckboxRootProps extends HTMLAttributes<HTMLDivElement>, CheckboxStyleProps {
  value?: CheckboxValue
  disabled?: boolean
  ref?: Ref<HTMLDivElement>
}
export type CheckboxProps = CheckboxRootProps

export function CheckboxRoot({
  value,
  disabled,
  size,
  className,
  ref,
  ...props
}: CheckboxRootProps) {
  const controlId = useId()
  return (
    <RootContext value={{ controlId, value, disabled }}>
      <div
        {...props}
        ref={ref}
        data-slot="checkbox-root"
        data-size={size ?? "md"}
        className={cn(checkboxRootClassName({ size }), className)}
      />
    </RootContext>
  )
}

export { CheckboxRoot as Checkbox }
