import { cn } from '@fex-design/utils'
import type { JSX, ParentProps } from 'solid-js'

export function SortableHandle(props: ParentProps<JSX.ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      data-sortable-handle=""
      class={cn('cursor-grab touch-none select-none active:cursor-grabbing', props.class)}
    />
  )
}
