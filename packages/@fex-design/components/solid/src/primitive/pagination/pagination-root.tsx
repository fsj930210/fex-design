import { paginationClassName } from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { JSX, ParentProps } from 'solid-js'
import { splitProps } from 'solid-js'

export function Pagination(props: ParentProps<JSX.HTMLAttributes<HTMLElement>>) {
  const [local, rest] = splitProps(props, ['class', 'children'])
  return (
    <nav
      {...rest}
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      class={cn(paginationClassName, local.class)}
    >
      {local.children}
    </nav>
  )
}

export { Pagination as PaginationRoot }
