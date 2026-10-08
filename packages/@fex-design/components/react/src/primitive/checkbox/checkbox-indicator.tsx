import {
  checkboxCheckIconClassName,
  checkboxIndicatorClassName,
  checkboxMinusIconClassName,
} from "@fex-design/components-styles/checkbox"
import { cn } from "@fex-design/utils"
import type { HTMLAttributes } from "react"
import { CheckIcon } from "@fex-design/react/icons/check"
import { MinusIcon } from "@fex-design/react/icons/minus"

export type CheckboxIndicatorProps = HTMLAttributes<HTMLSpanElement>

export function CheckboxIndicator({ className, ...props }: CheckboxIndicatorProps) {
  const { children, ...rest } = props
  return (
    <span
      {...rest}
      aria-hidden="true"
      data-slot="checkbox-indicator"
      className={cn(checkboxIndicatorClassName, className)}
    >
      {children ?? (
        <>
          <CheckIcon data-slot="checkbox-check" className={checkboxCheckIconClassName} />
          <MinusIcon data-slot="checkbox-minus" className={checkboxMinusIconClassName} />
        </>
      )}
    </span>
  )
}
