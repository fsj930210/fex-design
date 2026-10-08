import { checkboxLabelClassName } from "@fex-design/components-styles/checkbox"
import { cn } from "@fex-design/utils"
import { use, type LabelHTMLAttributes } from "react"
import { RootContext } from "./checkbox-context"

export type CheckboxLabelProps = LabelHTMLAttributes<HTMLLabelElement>

export function CheckboxLabel({
  htmlFor,
  className,
  ...props
}: CheckboxLabelProps) {
  const root = use(RootContext)
  return (
    <label
      {...props}
      htmlFor={htmlFor ?? root?.controlId}
      data-slot="checkbox-label"
      className={cn(checkboxLabelClassName, className)}
    />
  )
}
