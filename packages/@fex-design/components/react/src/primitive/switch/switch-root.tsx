import type { SwitchOptions } from '@fex-design/core/switch/types'
import { switchClassName } from '@fex-design/components-styles/switch'
import { cn } from '@fex-design/utils'
import type { ComponentProps, MouseEvent } from 'react'
import { useControllableState } from '@fex-design/react/hooks/use-controllable-state'
export type SwitchRootProps = Omit<ComponentProps<'button'>, 'onChange' | 'type' | 'role'> &
  SwitchOptions & { onChange?: (checked: boolean, event: MouseEvent<HTMLButtonElement>) => void }
export function SwitchRoot({
  checked,
  defaultChecked = false,
  disabled = false,
  loading = false,
  size = 'md',
  shape = 'rounded',
  className,
  onClick,
  onChange,
  ...props
}: SwitchRootProps) {
  const [currentChecked, setChecked] = useControllableState<boolean>(
    { checked, defaultChecked, onChange },
    { valuePropName: 'checked', defaultValuePropName: 'defaultChecked' },
  )
  return (
    <button
      {...props}
      type="button"
      role="switch"
      disabled={disabled || loading}
      aria-checked={currentChecked}
      aria-busy={loading || undefined}
      data-slot="switch"
      data-state={currentChecked ? 'checked' : 'unchecked'}
      data-loading={loading ? '' : undefined}
      data-disabled={disabled ? '' : undefined}
      data-size={size}
      data-shape={shape}
      className={cn(switchClassName({ size, shape }), className)}
      onClick={(event) => {
        onClick?.(event)
        if (event.defaultPrevented || disabled || loading) return
        setChecked(!currentChecked, event)
      }}
    />
  )
}
