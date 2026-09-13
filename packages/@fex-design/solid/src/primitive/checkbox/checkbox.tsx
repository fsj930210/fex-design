import { createCheckboxGroupController } from '@fex-design/core/checkbox/create-checkbox-group-controller'
import type { CheckboxGroupChangeMeta, CheckboxValue } from '@fex-design/core/checkbox/types'
import {
  checkboxControlClassName,
  checkboxCheckIconClassName,
  checkboxGroupClassName,
  checkboxIndicatorClassName,
  checkboxLabelClassName,
  checkboxMinusIconClassName,
  checkboxRootClassName,
  type CheckboxGroupStyleProps,
  type CheckboxStyleProps,
} from '@fex-design/styles/checkbox'
import { cn } from '@fex/utils'
import {
  createContext,
  createEffect,
  createUniqueId,
  splitProps,
  useContext,
  type JSX,
  type ParentProps,
} from 'solid-js'
import { createCoreStoreSignal } from '../../primitives/create-core-store-signal'
import { CheckIcon } from '../../icon/check'
import { MinusIcon } from '../../icon/minus'
interface RootContext {
  controlId: string
  value?: CheckboxValue
  disabled?: boolean
}
interface GroupContext {
  value: () => CheckboxValue[]
  disabled: () => boolean
  toggle(value: CheckboxValue): void
}
const RootContext = createContext<RootContext>()
const GroupContext = createContext<GroupContext>()
export interface CheckboxRootProps
  extends ParentProps<JSX.HTMLAttributes<HTMLDivElement>>, CheckboxStyleProps {
  value?: CheckboxValue
  disabled?: boolean
}
export function CheckboxRoot(props: CheckboxRootProps) {
  const [local, rest] = splitProps(props, ['value', 'disabled', 'size', 'class', 'children'])
  const controlId = createUniqueId()
  return (
    <RootContext.Provider value={{ controlId, value: local.value, disabled: local.disabled }}>
      <div
        {...rest}
        data-slot="checkbox-root"
        data-size={local.size ?? 'md'}
        class={cn(checkboxRootClassName({ size: local.size }), local.class)}
      >
        {local.children}
      </div>
    </RootContext.Provider>
  )
}
export interface CheckboxControlProps extends Omit<
  JSX.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'value'
> {
  value?: CheckboxValue
  indeterminate?: boolean
}
export function CheckboxControl(props: CheckboxControlProps) {
  const root = useContext(RootContext)
  const group = useContext(GroupContext)
  const [local, rest] = splitProps(props, [
    'id',
    'value',
    'checked',
    'disabled',
    'name',
    'indeterminate',
    'class',
    'onChange',
    'ref',
  ])
  let input!: HTMLInputElement
  const currentValue = () => local.value ?? root?.value
  const inGroup = () => group !== undefined && currentValue() !== undefined
  createEffect(() => {
    if (input) input.indeterminate = Boolean(local.indeterminate)
  })
  return (
    <input
      {...rest}
      ref={(node) => {
        input = node
        if (typeof local.ref === 'function') local.ref(node)
      }}
      id={local.id ?? root?.controlId}
      type="checkbox"
      name={local.name}
      value={currentValue()}
      checked={inGroup() ? group!.value().includes(currentValue()!) : local.checked}
      disabled={Boolean(local.disabled || root?.disabled || group?.disabled())}
      data-slot="checkbox-control"
      class={cn(checkboxControlClassName, local.class)}
      onChange={(event) => {
        if (typeof local.onChange === 'function') local.onChange(event)
        if (!event.defaultPrevented && inGroup()) group!.toggle(currentValue()!)
      }}
    />
  )
}
export function CheckboxIndicator(props: ParentProps<JSX.HTMLAttributes<HTMLSpanElement>>) {
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
export function CheckboxLabel(props: ParentProps<JSX.LabelHTMLAttributes<HTMLLabelElement>>) {
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
export interface CheckboxGroupProps
  extends
    ParentProps<Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onChange'>>,
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
    'value',
    'defaultValue',
    'disabled',
    'onChange',
    'orientation',
    'class',
    'children',
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
        data-orientation={local.orientation ?? 'vertical'}
        class={cn(checkboxGroupClassName({ orientation: local.orientation }), local.class)}
      >
        {local.children}
      </div>
    </GroupContext.Provider>
  )
}
