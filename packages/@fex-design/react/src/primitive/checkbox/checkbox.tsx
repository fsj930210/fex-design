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
  use,
  useId,
  useRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type Ref,
} from 'react'
import { useCoreStore } from '../../hooks/use-core-store'
import { useIsomorphicLayoutEffect } from '../../hooks/use-isomorphic-layout-effect'
import { useLazyRef } from '../../hooks/use-lazy-ref'
import { CheckIcon } from '../../icon/check'
import { MinusIcon } from '../../icon/minus'

export type { CheckboxGroupChangeMeta, CheckboxValue } from '@fex-design/core/checkbox/types'
interface RootContext {
  controlId: string
  value?: CheckboxValue
  disabled?: boolean
}
interface GroupContext {
  value: CheckboxValue[]
  disabled: boolean
  toggle: (value: CheckboxValue) => void
}
const RootContext = createContext<RootContext | null>(null)
const GroupContext = createContext<GroupContext | null>(null)

export interface CheckboxRootProps extends HTMLAttributes<HTMLDivElement>, CheckboxStyleProps {
  value?: CheckboxValue
  disabled?: boolean
  ref?: Ref<HTMLDivElement>
}
export function CheckboxRoot({
  value,
  disabled,
  size,
  className,
  ref,
  ...props
}: CheckboxRootProps) {
  const controlId = useId()
  return (
    <RootContext value={{ controlId, value, disabled }}>
      <div
        {...props}
        ref={ref}
        data-slot="checkbox-root"
        data-size={size ?? 'md'}
        className={cn(checkboxRootClassName({ size }), className)}
      />
    </RootContext>
  )
}

export interface CheckboxControlProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'value'
> {
  value?: CheckboxValue
  indeterminate?: boolean
  ref?: Ref<HTMLInputElement>
}
export function CheckboxControl({
  id,
  value,
  checked,
  defaultChecked,
  disabled,
  indeterminate = false,
  className,
  ref,
  onChange,
  ...props
}: CheckboxControlProps) {
  const root = use(RootContext)
  const group = use(GroupContext)
  const inputRef = useRef<HTMLInputElement>(null)
  const currentValue = value ?? root?.value
  const inGroup = group !== null && currentValue !== undefined
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])
  return (
    <input
      {...props}
      ref={(node) => {
        inputRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      id={id ?? root?.controlId}
      type="checkbox"
      name={props.name}
      value={currentValue}
      checked={inGroup ? group.value.includes(currentValue) : checked}
      defaultChecked={inGroup ? undefined : defaultChecked}
      disabled={Boolean(disabled || root?.disabled || group?.disabled)}
      data-slot="checkbox-control"
      className={cn(checkboxControlClassName, className)}
      onChange={(event) => {
        onChange?.(event)
        if (!event.defaultPrevented && inGroup && currentValue !== undefined)
          group.toggle(currentValue)
      }}
    />
  )
}
export function CheckboxIndicator({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
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
export function CheckboxLabel({
  htmlFor,
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  const root = use(RootContext)
  return (
    <label
      {...props}
      htmlFor={htmlFor ?? root?.controlId}
      data-slot="checkbox-label"
      className={cn(checkboxLabelClassName, className)}
    />
  )
}

export interface CheckboxGroupProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'>,
    CheckboxGroupStyleProps {
  value?: readonly CheckboxValue[]
  defaultValue?: readonly CheckboxValue[]
  disabled?: boolean
  onChange?: (value: CheckboxValue[], meta: CheckboxGroupChangeMeta) => void
  ref?: Ref<HTMLDivElement>
}
export function CheckboxGroup({
  value,
  defaultValue,
  disabled,
  onChange,
  orientation = 'vertical',
  className,
  ref,
  ...props
}: CheckboxGroupProps) {
  const optionsRef = useRef({ value, defaultValue, disabled, onChange })
  Object.assign(optionsRef.current, { value, defaultValue, disabled, onChange })
  const controllerRef = useLazyRef(() => createCheckboxGroupController(optionsRef.current))
  const snapshot = useCoreStore(controllerRef.current)
  return (
    <GroupContext
      value={{
        value: value ? [...value] : snapshot.value,
        disabled: disabled === true,
        toggle: controllerRef.current.toggle,
      }}
    >
      <div
        {...props}
        ref={ref}
        role="group"
        data-slot="checkbox-group"
        data-orientation={orientation}
        className={cn(checkboxGroupClassName({ orientation }), className)}
      />
    </GroupContext>
  )
}
