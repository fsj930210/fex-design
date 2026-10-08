import { paginationContentClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { JSX, ParentProps } from 'solid-js'
import { splitProps } from 'solid-js'

export function PaginationContent(props: ParentProps<JSX.HTMLAttributes<HTMLUListElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <ul
      {...rest}
      data-slot="pagination-content"
      class={cn(paginationContentClassName, local.class)}
    >
      {local.children}
    </ul>
  )
}
