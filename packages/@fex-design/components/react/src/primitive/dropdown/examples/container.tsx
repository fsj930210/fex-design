import { useRef } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'
export function DropdownContainerExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div className="grid gap-3 p-6">
      <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
      <div ref={container} className="relative min-h-48 rounded-lg border-2 border-dashed p-6">
        <DropdownRoot>
          <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
          <DropdownPortal container={container}>
            <DropdownContent>
              <MenuItem value="rename">重命名</MenuItem>
              <MenuItem value="duplicate">复制</MenuItem>
            </DropdownContent>
          </DropdownPortal>
        </DropdownRoot>
      </div>
    </div>
  )
}
