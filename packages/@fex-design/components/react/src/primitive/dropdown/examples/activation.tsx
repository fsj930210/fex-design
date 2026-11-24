import { useState } from 'react'
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem, type MenuActivateInfo } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'
export function DropdownActivationExample() {
  const [message, setMessage] = useState('尚未操作')
  const [selected, setSelected] = useState<string[]>([])
  function activate(info: MenuActivateInfo) {
    if (info.value === 'cancel') {
      info.preventDefault()
      setMessage('激活已取消')
      return
    }
    setMessage('已选择，菜单保持打开')
  }
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <DropdownRoot
        closeOnSelect={false}
        onActivate={activate}
        menuProps={{ value: selected, onValueChange: setSelected }}
      >
        <DropdownTrigger>{(props) => <Button {...props}>操作</Button>}</DropdownTrigger>
        <DropdownPortal>
          <DropdownContent>
            <MenuItem value="keep">选择并保持打开</MenuItem>
            <MenuItem value="cancel">取消激活</MenuItem>
          </DropdownContent>
        </DropdownPortal>
      </DropdownRoot>
      <output>
        {message}；选中：{selected.join(', ') || '无'}
      </output>
    </div>
  )
}
