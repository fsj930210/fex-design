import {
  PopoverContent,
  PopoverPortal,
} from '../popover'

export function TreeSelectContent(props: Parameters<typeof PopoverContent>[0]) {
  return (
    <PopoverPortal>
      <PopoverContent {...props} />
    </PopoverPortal>
  )
}
