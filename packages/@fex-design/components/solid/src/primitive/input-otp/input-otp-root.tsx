import { createInputOTPController } from "@fex-design/core/input-otp/create-input-otp-controller"
import type {
  InputOTPChangeMeta,
  InputOTPCompleteMeta,
  InputOTPValue,
} from "@fex-design/core/input-otp/types"
import { inputOTPRootClassName } from "@fex-design/components-styles/input-otp"
import { cn } from "@fex-design/utils"
import { createEffect, onCleanup, splitProps, type JSX, type ParentProps } from "solid-js"
import { createCoreStoreSignal } from "@fex-design/solid/primitives/create-core-store-signal"
import { InputOTPContext } from "./input-otp-context"

export interface InputOTPRootProps
  extends
    ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange">> {
  value?: InputOTPValue
  defaultValue?: InputOTPValue
  disabled?: boolean
  readOnly?: boolean
  invalid?: boolean
  isComplete?: (value: InputOTPValue) => boolean
  onChange?: (value: InputOTPValue, meta: InputOTPChangeMeta) => void
  onComplete?: (value: InputOTPValue, meta: InputOTPCompleteMeta) => void
}
export type InputOTPProps = InputOTPRootProps

export function InputOTPRoot(props: InputOTPRootProps) {
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "disabled",
    "readOnly",
    "invalid",
    "isComplete",
    "onChange",
    "onComplete",
    "class",
    "children",
  ])
  const controller = createInputOTPController({
    get value() {
      return local.value
    },
    get defaultValue() {
      return local.defaultValue
    },
    get disabled() {
      return local.disabled
    },
    get readOnly() {
      return local.readOnly
    },
    get invalid() {
      return local.invalid
    },
    get isComplete() {
      return local.isComplete
    },
    onChange(nextValue: InputOTPValue, meta: InputOTPChangeMeta) {
      local.onChange?.(nextValue, meta)
    },
    onComplete(nextValue: InputOTPValue, meta: InputOTPCompleteMeta) {
      local.onComplete?.(nextValue, meta)
    },
  })
  const snapshot = createCoreStoreSignal(controller)
  const inputs = new Map<number, HTMLInputElement>()

  createEffect(() => {
    controller.setOptions({
      value: local.value,
      defaultValue: local.defaultValue,
      disabled: local.disabled,
      readOnly: local.readOnly,
      invalid: local.invalid,
      isComplete: local.isComplete,
      onChange: local.onChange,
      onComplete: local.onComplete,
    })
  })

  onCleanup(() => controller.destroy())

  const registerInput = (index: number, element: HTMLInputElement | null) => {
    if (element) inputs.set(index, element)
    else inputs.delete(index)
  }
  const focusInput = (index: number, cursor: "start" | "end" | "all" = "all") => {
    const input = inputs.get(index)
    if (!input || input.disabled) return
    input.focus()
    const position = cursor === "start" ? 0 : input.value.length
    input.setSelectionRange(cursor === "all" ? 0 : position, position)
  }

  return (
    <InputOTPContext.Provider value={{ controller, snapshot, registerInput, focusInput }}>
      <div
        {...rest}
        role={rest.role ?? "group"}
        data-slot="input-otp-root"
        data-disabled={local.disabled ? "true" : undefined}
        data-readonly={local.readOnly ? "true" : undefined}
        data-invalid={local.invalid ? "true" : undefined}
        data-complete={snapshot().complete ? "true" : undefined}
        class={cn(inputOTPRootClassName, local.class)}
      >
        {local.children}
      </div>
    </InputOTPContext.Provider>
  )
}

export { InputOTPRoot as InputOTP }
