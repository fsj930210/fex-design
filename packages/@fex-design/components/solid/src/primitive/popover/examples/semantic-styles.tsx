import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/solid/primitive/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/solid/primitive/button'

const rootStyle = demo.variables
export function PopoverSemanticStylesExample() {
  return (
    <div class="w-full flex items-center justify-center min-h-[360px] py-16">
      <Popover arrow>
        <PopoverTrigger>
          {(binding) => (
            <Button {...binding.props} ref={binding.ref}>
              {demo.trigger}
            </Button>
          )}
        </PopoverTrigger>
        <PopoverPortal>
          <PopoverContent class={demo.classNames.root} style={rootStyle}>
            <PopoverArrow />
            <PopoverHeader>
              <PopoverTitle class={demo.classNames.title}>{demo.title}</PopoverTitle>
            </PopoverHeader>
            <div data-slot="popover-body" class={demo.classNames.content}>
              {demo.content}
            </div>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  )
}
