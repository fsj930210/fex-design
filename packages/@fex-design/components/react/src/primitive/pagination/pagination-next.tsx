import { paginationTextClassName } from '@fex-design/components-styles/pagination'
import type { ComponentProps } from 'react'
import { ChevronRightIcon } from '@fex-design/react/icons/chevron'
import { PaginationLink } from './pagination-link'

export function PaginationNext({
  className,
  text = 'Next',
  ...props
}: ComponentProps<typeof PaginationLink> & { text?: string }) {
  return (
    <PaginationLink aria-label="Go to next page" size="md" className={className} {...props}>
      <span className={paginationTextClassName}>{text}</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}
