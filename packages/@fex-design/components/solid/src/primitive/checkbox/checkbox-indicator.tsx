import {
  checkboxCheckIconClassName,
  checkboxIndicatorClassName,
  checkboxMinusIconClassName,
} from "@fex-design/components-styles/checkbox"
import { cn } from "@fex-design/utils"
import type { JSX, ParentProps } from "solid-js"
import { CheckIcon } from "@fex-design/solid/icons/check"
import { MinusIcon } from "@fex-design/solid/icons/minus"

export type CheckboxIndicatorProps = ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>

export function CheckboxIndicator(props: CheckboxIndicatorProps) {
  return (
    <span
      {...props}
      aria-hidden="true"
      data-slot="checkbox-indicator"
      class={cn(checkboxIndicatorClassName, props.class)}
    >
      {props.children ?? (
        <>
          <CheckIcon data-slot="checkbox-check" class={checkboxCheckIconClassName} />
          <MinusIcon data-slot="checkbox-minus" class={checkboxMinusIconClassName} />
        </>
      )}
    </span>
  )
}
