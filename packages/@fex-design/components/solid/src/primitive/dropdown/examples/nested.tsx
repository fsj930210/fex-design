import { createSignal } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem, SubMenu, SubMenuTrigger, SubMenuContent } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'
export function DropdownNestedExample() {
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
          <DropdownContent>
            <MenuItem value="rename">重命名</MenuItem>
            <SubMenu value="share">
              <SubMenuTrigger>分享</SubMenuTrigger>
              <SubMenuContent>
                <MenuItem value="link">复制链接</MenuItem>
                <SubMenu value="send">
                  <SubMenuTrigger>发送到</SubMenuTrigger>
                  <SubMenuContent>
                    <MenuItem value="email">电子邮件</MenuItem>
                  </SubMenuContent>
                </SubMenu>
              </SubMenuContent>
            </SubMenu>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>最近操作：{value()}</output>
    </div>
  )
}
