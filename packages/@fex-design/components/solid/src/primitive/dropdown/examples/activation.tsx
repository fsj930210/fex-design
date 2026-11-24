import { createSignal } from 'solid-js'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/solid/primitive/dropdown'
import { MenuItem, type MenuActivateInfo } from '@fex-design/solid/primitive/menu'
import { Button } from '@fex-design/solid/primitive/button'
export function DropdownActivationExample() {
  const [message, setMessage] = createSignal('尚未操作')
  const [selected, setSelected] = createSignal<string[]>([])
  function activate(info: MenuActivateInfo) {
    if (info.value === 'cancel') {
      info.preventDefault()
      setMessage('激活已取消')
      return
    }
    setMessage('已选择，菜单保持打开')
  }
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot
        closeOnSelect={false}
        onActivate={activate}
        menuProps={{
          get value() {
            return selected()
          },
          onValueChange: setSelected,
        }}
      >
        <DropdownTrigger>
          {(slot) => (
            <Button {...slot.props} ref={slot.ref}>
              操作
            </Button>
          )}
        </DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="keep">选择并保持打开</MenuItem>
            <MenuItem value="cancel">取消激活</MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>
        {message()}；选中：{selected().join(', ') || '无'}
      </output>
    </div>
  )
}
