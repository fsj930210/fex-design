import { createSignal, Show } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'
export function DropdownDynamicExample() {
  const [hasItems, setHasItems] = createSignal(true)
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setHasItems(!hasItems())}>切换菜单项</Button>
      <DropdownRoot closeOnSelect={false}>
        <DropdownTrigger>
          {(slot) => (
            <Button {...slot.props} ref={slot.ref}>
              操作
            </Button>
          )}
        </DropdownTrigger>
        <DropdownPortal>
          <DropdownContent aria-label={hasItems() ? '操作菜单' : '操作菜单，无可用操作'}>
            <Show
              when={hasItems()}
              fallback={
                <span aria-hidden="true" class="px-3 py-2 text-muted-foreground">
                  暂无操作
                </span>
              }
            >
              <MenuItem value="rename">重命名</MenuItem>
              <MenuItem value="duplicate">复制</MenuItem>
              <MenuItem value="clear" onClick={() => setHasItems(false)}>
                移除菜单项
              </MenuItem>
            </Show>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>菜单项：{hasItems() ? '三个' : '无'}</output>
    </div>
  )
}
