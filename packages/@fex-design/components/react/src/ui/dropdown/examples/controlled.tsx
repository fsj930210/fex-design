import { useState } from 'react'
import { Dropdown } from '@fex-design/react/ui/dropdown'
import { Button } from '@fex-design/react/ui/button'
const items = [
  { value: 'rename', label: '重命名' },
  { value: 'duplicate', label: '复制' },
]
export function DropdownControlledExample() {
  const [open, setOpen] = useState(false)
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  return (
    <div className="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setOpen(!open)}>外部切换</Button>
      <Dropdown items={items} open={open} onOpenChange={setOpen}>
        受控菜单
      </Dropdown>
      <output>菜单状态：{open ? '打开' : '关闭'}</output>
      <Dropdown items={items} onOpenChange={setUncontrolledOpen}>
        非受控菜单
      </Dropdown>
      <output>非受控菜单状态：{uncontrolledOpen ? '打开' : '关闭'}</output>
    </div>
  )
}
