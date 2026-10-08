import { paginationTextClassName } from '@fex-design/components-styles/pagination'
import type { ComponentProps } from 'react'
import { ChevronLeftIcon } from '@fex-design/react/icons/chevron'
import { PaginationLink } from './pagination-link'

export function PaginationPrevious({
  className,
  text = 'Previous',
  ...props
}: ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink aria-label="Go to previous page" size="md" className={className} {...props}>
      <ChevronLeftIcon />
      <span className={paginationTextClassName}>{text}</span>
    </PaginationLink>
  )
}
