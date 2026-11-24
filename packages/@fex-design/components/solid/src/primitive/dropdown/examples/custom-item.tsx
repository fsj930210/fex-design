import { createSignal } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'

export function DropdownCustomItemExample() {
  const [selected, setSelected] = createSignal('尚未选择')
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot onActivate={(info) => setSelected(info.value)}>
        <DropdownTrigger>
          {(slot) => (
            <Button {...slot.props} ref={slot.ref}>
              选择操作
            </Button>
          )}
        </DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem
              value="edit"
              textValue="编辑"
              class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
            >
              {({ props }) => (
                <button {...props}>
                  <span>编辑资料</span>
                  <kbd>⌘ E</kbd>
                </button>
              )}
            </MenuItem>
            <MenuItem
              value="archive"
              textValue="归档"
              class="flex h-[var(--menu-item-height)] items-center justify-between gap-6 px-[var(--menu-item-padding-x)] text-sm"
            >
              {({ props }) => (
                <button {...props}>
                  <span>归档项目</span>
                  <kbd>⌘ A</kbd>
                </button>
              )}
            </MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>最近操作：{selected()}</output>
    </div>
  )
}
