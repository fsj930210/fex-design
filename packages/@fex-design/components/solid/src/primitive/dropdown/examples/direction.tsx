import { For } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'

export function DropdownDirectionExample() {
  return (
    <div class="flex min-h-64 flex-wrap justify-around gap-8 p-6">
      <For each={['ltr', 'rtl'] as const}>
        {(dir) => (
          <div dir={dir} class="flex flex-col items-start gap-3">
            <span>{dir.toUpperCase()}</span>
            <DropdownRoot menuProps={{ dir }}>
              <DropdownTrigger>
                {(slot) => (
                  <Button {...slot.props} ref={slot.ref}>
                    操作
                  </Button>
                )}
              </DropdownTrigger>
              <DropdownPortal>
                <DropdownContent>
                  <MenuItem value="rename">重命名</MenuItem>
                  <SubMenu value="share">
                    <SubMenuTrigger>分享</SubMenuTrigger>
                    <SubMenuContent>
                      <MenuItem value="link">复制链接</MenuItem>
                    </SubMenuContent>
                  </SubMenu>
                </DropdownContent>
              </DropdownPortal>
            </DropdownRoot>
          </div>
        )}
      </For>
    </div>
  )
}
