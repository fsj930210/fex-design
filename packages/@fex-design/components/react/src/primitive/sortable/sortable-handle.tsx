import { cn } from '@fex-design/utils'
import type { ButtonHTMLAttributes } from 'react'
import { useSortableContext } from './sortable-context'

export interface SortableHandleProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function SortableHandle({ className, type = 'button', ...props }: SortableHandleProps) {
  const sortable = useSortableContext()

  return (
    <button
      {...props}
      {...sortable.getHandleProps()}
      type={type}
      className={cn('cursor-grab touch-none select-none active:cursor-grabbing', className)}
    />
  )
}
