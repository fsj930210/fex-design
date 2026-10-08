import type { JSX, ParentProps } from 'solid-js'

export function PaginationItem(props: ParentProps<JSX.LiHTMLAttributes<HTMLLIElement>>) {
  return <li {...props} data-slot="pagination-item" />
}
