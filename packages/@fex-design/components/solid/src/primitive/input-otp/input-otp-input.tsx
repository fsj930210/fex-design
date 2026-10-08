import type {
  InputOTPAccept,
  InputOTPTransform,
} from "@fex-design/core/input-otp/types"
import { inputOTPInputClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import { createEffect, onCleanup, onMount, splitProps, type JSX } from "solid-js"
import { useInputOTPContext } from "./input-otp-context"

export interface InputOTPInputProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  "defaultValue" | "disabled" | "onChange" | "readOnly" | "value"
> {
  index: number
  maxLength?: number
  autoAdvance?: boolean
  transform?: InputOTPTransform
  accept?: InputOTPAccept
  onChange?: JSX.EventHandler<HTMLInputElement, Event>
}

export function InputOTPInput(props: InputOTPInputProps) {
  const context = useInputOTPContext("InputOTPInput")
  const [local, rest] = splitProps(props, [
    "index",
    "maxLength",
    "autoAdvance",
    "transform",
    "accept",
    "disabled",
    "readOnly",
    "class",
    "ref",
    "onChange",
    "onPaste",
    "onKeyDown",
  ])
  const config = () => ({
    index: local.index,
    maxLength: local.maxLength,
    autoAdvance: local.autoAdvance ?? true,
    transform: local.transform,
    accept: local.accept,
    disabled: local.disabled === true,
    readOnly: local.readOnly === true,
  })
  let element: HTMLInputElement | undefined
  let unregister: (() => void) | undefined

  onMount(() => {
    unregister = context.controller.registerSegment(config())
    if (element) context.registerInput(local.index, element)
  })
  onCleanup(() => {
    unregister?.()
    context.registerInput(local.index, null)
  })
  createEffect(() => context.controller.updateSegment(config()))

  const currentValue = () => context.snapshot().value[local.index] ?? ""
  const currentDisabled = () => context.snapshot().disabled || local.disabled === true
  const currentReadOnly = () => context.snapshot().readOnly || local.readOnly === true
  const segment = () => context.snapshot().segments.find((item) => item.index === local.index)
  const applyText = (
    text: string,
    reason: "input" | "paste" | "delete" | "composition",
    selection = { start: 0, end: currentValue().length },
  ) => {
    const result = context.controller.applyInput({ index: local.index, text, selection, reason })
    if (result.focusIndex !== undefined) context.focusInput(result.focusIndex, result.cursor)
    return result
  }

  return (
    <input
      {...rest}
      ref={(node) => {
        element = node
        context.registerInput(local.index, node)
        if (typeof local.ref === "function") local.ref(node)
      }}
      type={rest.type ?? "text"}
      value={currentValue()}
      disabled={currentDisabled()}
      readOnly={currentReadOnly()}
      aria-invalid={rest["aria-invalid"] ?? (context.snapshot().invalid || undefined)}
      data-slot="input-otp-input"
      data-index={local.index}
      data-filled={currentValue().length > 0 ? "true" : undefined}
      data-complete={segment()?.complete ? "true" : undefined}
      class={cn(inputOTPInputClassName, local.class)}
      onInput={(event) => {
        const handler = local.onChange
        if (typeof handler === "function") handler(event)
        if (event.defaultPrevented) return
        const native = event as InputEvent
        const result = applyText(
          event.currentTarget.value,
          native.inputType?.startsWith("delete") ? "delete" : "input",
        )
        if (!result.accepted) event.currentTarget.value = currentValue()
      }}
      onPaste={(event) => {
        if (typeof local.onPaste === "function") local.onPaste(event)
        if (event.defaultPrevented || currentDisabled() || currentReadOnly()) return
        event.preventDefault()
        applyText(event.clipboardData?.getData("text") ?? "", "paste", {
          start: event.currentTarget.selectionStart ?? 0,
          end: event.currentTarget.selectionEnd ?? 0,
        })
      }}
      onKeyDown={(event) => {
        if (typeof local.onKeyDown === "function") local.onKeyDown(event)
        if (event.defaultPrevented) return
        const start = event.currentTarget.selectionStart ?? 0
        const end = event.currentTarget.selectionEnd ?? start
        if (event.key === "Backspace" && currentValue() === "" && start === 0 && end === 0) {
          event.preventDefault()
          context.focusInput(local.index - 1, "end")
        } else if (event.key === "ArrowLeft" && start === 0 && end === 0) {
          event.preventDefault()
          context.focusInput(local.index - 1, "end")
        } else if (event.key === "ArrowRight" && start === currentValue().length && end === start) {
          event.preventDefault()
          context.focusInput(local.index + 1, "start")
        }
      }}
    />
  )
}
