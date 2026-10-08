import type {
  InputOTPAccept,
  InputOTPTransform,
} from "@fex-design/core/input-otp/types"
import { inputOTPInputClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import {
  useEffect,
  useRef,
  type ComponentProps,
  type KeyboardEvent,
  type Ref,
} from "react"
import { useIsomorphicLayoutEffect } from "@fex-design/react/hooks/use-isomorphic-layout-effect"
import { useInputOTPContext } from "./input-otp-context"

export interface InputOTPInputProps extends Omit<
  ComponentProps<"input">,
  "defaultValue" | "disabled" | "onChange" | "readOnly" | "value"
> {
  index: number
  maxLength?: number | undefined
  autoAdvance?: boolean | undefined
  transform?: InputOTPTransform | undefined
  accept?: InputOTPAccept | undefined
  onChange?: ComponentProps<"input">["onChange"]
  ref?: Ref<HTMLInputElement> | undefined
}

export function InputOTPInput({
  index,
  maxLength,
  autoAdvance = true,
  transform,
  accept,
  disabled = false,
  readOnly = false,
  className,
  onChange,
  onPaste,
  onKeyDown,
  ref,
  ...props
}: InputOTPInputProps) {
  const context = useInputOTPContext("InputOTPInput")
  const segment = context.snapshot.segments.find((item) => item.index === index)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    const unregister = context.controller.registerSegment({
      index,
      ...(maxLength === undefined ? {} : { maxLength }),
      autoAdvance,
      ...(transform === undefined ? {} : { transform }),
      ...(accept === undefined ? {} : { accept }),
      disabled,
      readOnly,
    })
    return () => unregister()
  }, [context.controller, index, maxLength, autoAdvance, transform, accept, disabled, readOnly])

  useIsomorphicLayoutEffect(() => {
    context.controller.updateSegment({
      index,
      ...(maxLength === undefined ? {} : { maxLength }),
      autoAdvance,
      ...(transform === undefined ? {} : { transform }),
      ...(accept === undefined ? {} : { accept }),
      disabled,
      readOnly,
    })
  }, [context.controller, index, maxLength, autoAdvance, transform, accept, disabled, readOnly])

  const currentValue = context.snapshot.value[index] ?? ""
  const currentDisabled = context.snapshot.disabled || disabled
  const currentReadOnly = context.snapshot.readOnly || readOnly

  const applyText = (
    text: string,
    reason: "input" | "paste" | "delete" | "composition",
    selection = { start: 0, end: currentValue.length },
  ) => {
    const result = context.controller.applyInput({ index, text, selection, reason })
    if (result.focusIndex !== undefined) context.focusInput(result.focusIndex, result.cursor)
    return result
  }

  return (
    <input
      {...props}
      ref={(element) => {
        inputRef.current = element
        context.registerInput(index, element)
        if (typeof ref === "function") ref(element)
        else if (ref && "current" in ref) ref.current = element
      }}
      type={props.type ?? "text"}
      value={currentValue}
      disabled={currentDisabled}
      readOnly={currentReadOnly}
      aria-invalid={props["aria-invalid"] ?? (context.snapshot.invalid || undefined)}
      data-slot="input-otp-input"
      data-index={index}
      data-filled={currentValue.length > 0 ? "true" : undefined}
      data-complete={segment?.complete ? "true" : undefined}
      className={cn(inputOTPInputClassName, className)}
      onChange={(event) => {
        onChange?.(event)
        if (event.defaultPrevented) return
        const native = event.nativeEvent as InputEvent
        const result = applyText(
          event.currentTarget.value,
          native.inputType?.startsWith("delete") ? "delete" : "input",
        )
        if (!result.accepted) event.currentTarget.value = currentValue
      }}
      onPaste={(event) => {
        onPaste?.(event)
        if (event.defaultPrevented || currentDisabled || currentReadOnly) return
        event.preventDefault()
        applyText(event.clipboardData.getData("text"), "paste", {
          start: event.currentTarget.selectionStart ?? 0,
          end: event.currentTarget.selectionEnd ?? 0,
        })
      }}
      onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
        onKeyDown?.(event)
        if (event.defaultPrevented) return
        const start = event.currentTarget.selectionStart ?? 0
        const end = event.currentTarget.selectionEnd ?? start
        if (event.key === "Backspace" && currentValue === "" && start === 0 && end === 0) {
          event.preventDefault()
          context.focusInput(index - 1, "end")
        } else if (event.key === "ArrowLeft" && start === 0 && end === 0) {
          event.preventDefault()
          context.focusInput(index - 1, "end")
        } else if (event.key === "ArrowRight" && start === currentValue.length && end === start) {
          event.preventDefault()
          context.focusInput(index + 1, "start")
        }
      }}
    />
  )
}
