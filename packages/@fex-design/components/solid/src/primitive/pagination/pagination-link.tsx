import {
  paginationLinkClassName,
  paginationTextLinkClassName,
} from '@fex-design/components-styles/pagination'
import { cn } from '@fex-design/utils'
import type { JSX, ParentProps } from 'solid-js'
import { splitProps } from 'solid-js'

export type PaginationLinkProps = ParentProps<JSX.AnchorHTMLAttributes<HTMLAnchorElement>> & {
  isActive?: boolean
  size?: 'md' | 'icon'
}

export function PaginationLink(props: PaginationLinkProps) {
  const [local, rest] = splitProps(props, ['class', 'children', 'isActive', 'size'])
  return (
    <a
      {...rest}
      aria-current={local.isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={local.isActive ? 'true' : undefined}
      class={cn(
        paginationLinkClassName,
        (local.size ?? 'icon') === 'md' ? paginationTextLinkClassName : '',
        local.class,
      )}
    >
      {local.children}
    </a>
  )
}
