import { paginationTextClassName } from '@fex-design/components-styles/pagination'
import type { ComponentProps } from 'solid-js'
import { splitProps } from 'solid-js'
import { ChevronRightIcon } from '@fex-design/solid/icons/chevron'
import { PaginationLink } from './pagination-link'

export function PaginationNext(props: ComponentProps<typeof PaginationLink> & { text?: string }) {
  const [local, rest] = splitProps(props, ['children', 'text'])
  return (
    <PaginationLink {...rest} aria-label="Go to next page" size="md">
      <span class={paginationTextClassName}>{local.text ?? 'Next'}</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}
