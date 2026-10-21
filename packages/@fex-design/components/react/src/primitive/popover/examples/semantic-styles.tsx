import type { CSSProperties } from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverTitle,
} from '@fex-design/react/primitive/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/react/primitive/button'

const rootStyle = demo.variables as CSSProperties
export function PopoverSemanticStylesExample() {
  return (
    <div className="w-full flex items-center justify-center min-h-[360px] py-16">
      <Popover arrow>
        <PopoverTrigger>{(binding) => <Button {...binding}>{demo.trigger}</Button>}</PopoverTrigger>
        <PopoverPortal>
          <PopoverContent className={demo.classNames.root} style={rootStyle}>
            <PopoverArrow />
            <PopoverHeader>
              <PopoverTitle className={demo.classNames.title}>{demo.title}</PopoverTitle>
            </PopoverHeader>
            <div data-slot="popover-body" className={demo.classNames.content}>
              {demo.content}
            </div>
          </PopoverContent>
        </PopoverPortal>
      </Popover>
    </div>
  )
}
