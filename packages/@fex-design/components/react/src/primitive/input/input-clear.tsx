import { inputClearClassName } from "@fex-design/components-styles/input"
import { cn } from "@fex-design/utils"
import type { ComponentProps, MouseEvent, ReactNode, Ref } from "react"
import { CircleXIcon } from "@fex-design/react/icons/circle-x"
import { useInputContext } from "./input-context"

export interface InputClearProps extends Omit<ComponentProps<"button">, "type"> {
  ref?: Ref<HTMLButtonElement> | undefined
  children?: ReactNode
}

export function InputClear({
  className,
  children,
  "aria-label": ariaLabel = "Clear input",
  onClick,
  ref,
  ...props
}: InputClearProps) {
  const input = useInputContext("InputClear")

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      aria-label={ariaLabel}
      data-slot="input-clear"
      className={cn(inputClearClassName, className)}
      onClick={(event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event)
        if (!event.defaultPrevented) input.clear()
      }}
    >
      {children ?? <CircleXIcon />}
    </button>
  )
}
