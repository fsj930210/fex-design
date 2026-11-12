import { checkboxControlClassName } from '@fex-design/components-styles/checkbox'
import type { CheckboxValue } from '@fex-design/core/checkbox/types'
import { cn } from '@fex-design/utils'
import { use, useRef, type InputHTMLAttributes, type Ref } from 'react'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { GroupContext, RootContext } from './checkbox-context'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'
import { useNativeControlTarget } from '@fex-design/react/hooks/use-native-control-target'

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
  const nativeTarget = useNativeControlTarget()
  const composedRef = useComposedRef(inputRef, ref, nativeTarget)
  const currentValue = value ?? root?.value
  const inGroup = group !== null && currentValue !== undefined
  useIsomorphicLayoutEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])
  return (
    <input
      {...props}
      ref={composedRef}
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
