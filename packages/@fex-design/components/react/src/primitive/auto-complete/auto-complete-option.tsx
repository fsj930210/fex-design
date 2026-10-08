import { autoCompleteOptionClassName } from '@fex-design/components-styles/auto-complete'
import { cn } from '@fex-design/utils'
import type { ComponentProps } from 'react'
import { useAutoComplete, useAutoCompleteOption } from './use-auto-complete'

export interface AutoCompleteOptionProps extends ComponentProps<'div'> {
  itemKey: string | number
}

export function AutoCompleteOption({
  itemKey,
  className,
  onPointerMove,
  onPointerDown,
  onClick,
  ...props
}: AutoCompleteOptionProps) {
  const autoComplete = useAutoComplete()
  const state = useAutoCompleteOption(itemKey)
  return (
    <div
      {...props}
      id={`${autoComplete.listId}-${itemKey}`}
      role="option"
      aria-selected={state.active}
      aria-disabled={state.disabled || undefined}
      data-active={state.active ? 'true' : undefined}
      data-disabled={state.disabled ? 'true' : undefined}
      className={cn(autoCompleteOptionClassName, className)}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (!event.defaultPrevented) state.activate()
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event)
        if (!event.defaultPrevented) event.preventDefault()
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!event.defaultPrevented) state.select()
      }}
    />
  )
}
