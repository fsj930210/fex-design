import { createCheckboxGroupController } from "@fex-design/core/checkbox/create-checkbox-group-controller"
import type { CheckboxGroupChangeMeta, CheckboxValue } from "@fex-design/core/checkbox/types"
import { checkboxGroupClassName, type CheckboxGroupStyleProps } from "@fex-design/components-styles/checkbox"
import { cn } from "@fex-design/utils"
import { splitProps, type JSX, type ParentProps } from "solid-js"
import { createCoreStoreSignal } from "@fex-design/solid/primitives/create-core-store-signal"
import { GroupContext } from "./checkbox-context"

export interface CheckboxGroupProps
  extends
    ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, "onChange">>,
    CheckboxGroupStyleProps {
  value?: readonly CheckboxValue[]
  defaultValue?: readonly CheckboxValue[]
  disabled?: boolean
  onChange?: (value: CheckboxValue[], meta: CheckboxGroupChangeMeta) => void
}

export function CheckboxGroup(props: CheckboxGroupProps) {
  const options = {
    get value() {
      return props.value
    },
    get defaultValue() {
      return props.defaultValue
    },
    get disabled() {
      return props.disabled
    },
    get onChange() {
      return props.onChange
    },
  }
  const controller = createCheckboxGroupController(options)
  const snapshot = createCoreStoreSignal(controller)
  const [local, rest] = splitProps(props, [
    "value",
    "defaultValue",
    "disabled",
    "onChange",
    "orientation",
    "class",
    "children",
  ])
  return (
    <GroupContext.Provider
      value={{
        value: () => (local.value ? [...local.value] : snapshot().value),
        disabled: () => local.disabled === true,
        toggle: controller.toggle,
      }}
    >
      <div
        {...rest}
        role="group"
        data-slot="checkbox-group"
        data-orientation={local.orientation ?? "vertical"}
        class={cn(checkboxGroupClassName({ orientation: local.orientation }), local.class)}
      >
        {local.children}
      </div>
    </GroupContext.Provider>
  )
}
