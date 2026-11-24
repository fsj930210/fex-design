import { createSignal, type JSX } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'

export function DropdownCssVariablesExample() {
  const [value, setValue] = createSignal('尚未选择')
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot onActivate={(info) => setValue(info.value)}>
        <DropdownTrigger>
          {(slot) => (
            <Button {...slot.props} ref={slot.ref}>
              操作
            </Button>
          )}
        </DropdownTrigger>
        <DropdownPortal>
          <DropdownContent
            style={
              {
                '--popover-background': '#f5f3ff',
                '--popover-border': '#8b5cf6',
                '--popover-foreground': '#4c1d95',
                '--menu-item-hover-background': '#ddd6fe',
              } as JSX.CSSProperties
            }
          >
            <MenuItem value="rename">重命名</MenuItem>
            <MenuItem value="duplicate">复制</MenuItem>
            <MenuItem value="archive" disabled>
              归档
            </MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>最近操作：{value()}</output>
    </div>
  )
}
