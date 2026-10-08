import { paginationTextClassName } from '@fex-design/components-styles/pagination'
import type { ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { ChevronLeftIcon } from '@fex-design/solid/icons/chevron'
import { PaginationLink } from './pagination-link'

export function PaginationPrevious(
  props: ComponentProps<typeof PaginationLink> & { text?: string },
) {
  const [local, rest] = splitProps(props, ['children', 'text'])
  return (
    <PaginationLink {...rest} aria-label="Go to previous page" size="md">
      <ChevronLeftIcon />
      <span class={paginationTextClassName}>{local.text ?? 'Previous'}</span>
    </PaginationLink>
  )
}
