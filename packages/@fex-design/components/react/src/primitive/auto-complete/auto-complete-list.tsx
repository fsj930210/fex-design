import { autoCompleteListClassName } from '@fex-design/components-styles/auto-complete'
import { cn } from '@fex-design/utils'
import { type ComponentProps, type ReactNode } from 'react'
import { useAutoComplete } from './use-auto-complete'
import { AutoCompleteOption } from './auto-complete-option'

export interface AutoCompleteListProps extends ComponentProps<'div'> {
  renderItem?: (item: unknown, state: { active: boolean; disabled: boolean }) => ReactNode
}

export function AutoCompleteList({
  className,
  children,
  renderItem,
  ...props
}: AutoCompleteListProps) {
  const autoComplete = useAutoComplete()
  return (
    <div
      {...props}
      id={autoComplete.listId}
      role="listbox"
      className={cn(autoCompleteListClassName, className)}
    >
      {children ??
        autoComplete.items.map((entry) => (
          <AutoCompleteOption key={entry.key} itemKey={entry.key}>
            {renderItem?.(entry.item, {
              active: autoComplete.snapshot.activeKey === entry.key,
              disabled: entry.disabled,
            }) ?? entry.label}
          </AutoCompleteOption>
        ))}
    </div>
  )
}
