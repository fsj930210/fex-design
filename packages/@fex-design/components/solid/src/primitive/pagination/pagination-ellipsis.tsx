import {
  paginationEllipsisClassName,
  paginationSrOnlyClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { JSX } from 'solid-js'
import { splitProps } from 'solid-js'
import { EllipsisIcon } from '@fex-design/solid/icons/more'

export function PaginationEllipsis(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  const [local, rest] = splitProps(props, ['class'])
  return (
    <span
      {...rest}
      aria-hidden
      data-slot="pagination-ellipsis"
      class={cn(paginationEllipsisClassName, local.class)}
    >
      <EllipsisIcon />
      <span class={paginationSrOnlyClassName}>More pages</span>
    </span>
  )
}
