import { checkboxLabelClassName } from "@fex-design/components-styles/checkbox"
import { cn } from "@fex-design/utils"
import { useContext, type JSX, type ParentProps } from "solid-js"
import { RootContext } from "./checkbox-context"

export type CheckboxLabelProps = ParentProps<JSX.LabelHTMLAttributes<HTMLLabelElement>>

export function CheckboxLabel(props: CheckboxLabelProps) {
  const root = useContext(RootContext)
  return (
    <label
      {...props}
      for={props.for ?? root?.controlId}
      data-slot="checkbox-label"
      class={cn(checkboxLabelClassName, props.class)}
    >
      {props.children}
    </label>
  )
}
