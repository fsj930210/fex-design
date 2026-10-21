import type { CSSProperties } from 'react'
import { Popover } from '@fex-design/react/ui/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/react/ui/button'

const rootStyle = demo.variables as CSSProperties
export function PopoverSemanticStylesExample() {
  return (
    <div className="w-full flex items-center justify-center min-h-[360px] py-16">
      <Popover
        arrow
        title={demo.title}
        content={demo.content}
        classNames={demo.classNames}
        styles={{ root: rootStyle }}
      >
        <Button>{demo.trigger}</Button>
      </Popover>
    </div>
  )
}
