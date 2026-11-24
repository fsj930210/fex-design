import { createSignal } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'
export function DropdownContainerExample() {
  const [container, setContainer] = createSignal<HTMLDivElement | null>(null)
  return (
    <div class="grid gap-3 p-6">
      <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
      <div ref={setContainer} class="relative min-h-48 rounded-lg border-2 border-dashed p-6">
        <DropdownRoot>
          <DropdownTrigger>
            {(slot) => (
              <Button {...slot.props} ref={slot.ref}>
                操作
              </Button>
            )}
          </DropdownTrigger>
          <DropdownPortal container={container()}>
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
