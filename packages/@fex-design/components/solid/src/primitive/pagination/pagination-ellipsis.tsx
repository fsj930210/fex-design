import { paginationEllipsisClassName } from '@fex-design/components-styles/pagination'
import { usePaginationContext } from './context'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { MoreIcon } from '@fex-design/solid/icons/more'

export function PaginationEllipsis(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const { size } = usePaginationContext()
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <span
      {...rest}
      aria-hidden
      data-slot="pagination-ellipsis"
      class={cn(paginationEllipsisClassName({ size: size() }), local.class)}
    >
      {local.children ?? <MoreIcon />}
    </span>
  )
}
