import { createInputOTPController } from "@fex-design/core/input-otp/create-input-otp-controller"
import type {
  InputOTPChangeMeta,
  InputOTPCompleteMeta,
  InputOTPRootOptions,
  InputOTPValue,
} from "@fex-design/core/input-otp/types"
import { inputOTPRootClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import {
  useRef,
  type HTMLAttributes,
  type Ref,
} from "react"
import { useCoreStore } from "@fex-design/react/hooks/use-core-store"
import { useIsomorphicLayoutEffect } from "@fex-design/react/hooks/use-isomorphic-layout-effect"
import { useLazyRef } from "@fex-design/react/hooks/use-lazy-ref"
import { InputOTPContext } from "./input-otp-context"

export interface InputOTPRootProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">, InputOTPRootOptions {
  ref?: Ref<HTMLDivElement> | undefined
}
export type InputOTPProps = InputOTPRootProps

export function InputOTPRoot({
  value,
  defaultValue,
  disabled = false,
  readOnly = false,
  invalid = false,
  isComplete,
  onChange,
  onComplete,
  className,
  ref,
  children,
  ...props
}: InputOTPRootProps) {
  const optionsRef = useRef<InputOTPRootOptions>({})
  Object.assign(optionsRef.current, {
    value,
    defaultValue,
    disabled,
    readOnly,
    invalid,
    isComplete,
    onChange,
    onComplete,
  })
  const controller = useLazyRef(() =>
    createInputOTPController({
      get value() {
        return optionsRef.current.value
      },
      get defaultValue() {
        return optionsRef.current.defaultValue
      },
      get disabled() {
        return optionsRef.current.disabled
      },
      get readOnly() {
        return optionsRef.current.readOnly
      },
      get invalid() {
        return optionsRef.current.invalid
      },
      get isComplete() {
        return optionsRef.current.isComplete
      },
      onChange(nextValue: InputOTPValue, meta: InputOTPChangeMeta) {
        optionsRef.current.onChange?.(nextValue, meta)
      },
      onComplete(nextValue: InputOTPValue, meta: InputOTPCompleteMeta) {
        optionsRef.current.onComplete?.(nextValue, meta)
      },
    }),
  ).current
  const snapshot = useCoreStore(controller)
  const inputsRef = useRef(new Map<number, HTMLInputElement>())

  useIsomorphicLayoutEffect(() => {
    controller.setOptions(optionsRef.current)
  }, [value, defaultValue, disabled, readOnly, invalid, isComplete, onChange, onComplete])

  const registerInput = (index: number, element: HTMLInputElement | null) => {
    if (element) inputsRef.current.set(index, element)
    else inputsRef.current.delete(index)
  }
  const focusInput = (index: number, cursor: "start" | "end" | "all" = "all") => {
    const input = inputsRef.current.get(index)
    if (!input || input.disabled) return
    input.focus()
    const position = cursor === "start" ? 0 : input.value.length
    input.setSelectionRange(cursor === "all" ? 0 : position, position)
  }

  return (
    <InputOTPContext value={{ controller, snapshot, registerInput, focusInput }}>
      <div
        {...props}
        ref={ref}
        role={props.role ?? "group"}
        data-slot="input-otp-root"
        data-disabled={disabled ? "true" : undefined}
        data-readonly={readOnly ? "true" : undefined}
        data-invalid={invalid ? "true" : undefined}
        data-complete={snapshot.complete ? "true" : undefined}
        className={cn(inputOTPRootClassName, className)}
      >
        {children}
      </div>
    </InputOTPContext>
  )
}

export { InputOTPRoot as InputOTP }
