import type { ComponentProps } from 'react'

export function ListboxItemIndicator({ children, className, ...props }: ComponentProps<'span'>) {
  return (
    <span {...props} aria-hidden="true" data-slot="listbox-item-indicator" className={className}>
      {children}
    </span>
  )
}
