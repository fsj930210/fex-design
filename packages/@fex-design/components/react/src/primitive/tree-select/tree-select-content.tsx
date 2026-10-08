import type { ComponentProps } from 'react'
import {
  PopoverContent,
  PopoverPortal,
} from '../popover'

export interface TreeSelectContentProps extends ComponentProps<typeof PopoverContent> {
  container?: HTMLElement | null | undefined
  forceMount?: boolean | undefined
}

export function TreeSelectContent({ container, forceMount, ...props }: TreeSelectContentProps) {
  return (
    <PopoverPortal
      {...(container === undefined ? {} : { container })}
      {...(forceMount === undefined ? {} : { forceMount })}
    >
      <PopoverContent {...props} />
    </PopoverPortal>
  )
}
