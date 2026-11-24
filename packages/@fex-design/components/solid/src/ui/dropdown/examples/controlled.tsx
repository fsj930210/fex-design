import { createSignal } from 'solid-js'
import { Dropdown } from '@fex-design/solid/ui/dropdown'
import { Button } from '@fex-design/solid/ui/button'
export function DropdownControlledExample() {
  const [open, setOpen] = createSignal(false)
  const [uncontrolledOpen, setUncontrolledOpen] = createSignal(false)
  const items = [
    { value: 'rename', label: '重命名' },
    { value: 'duplicate', label: '复制' },
  ]
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <Button onClick={() => setOpen(!open())}>外部切换</Button>
      <Dropdown items={items} open={open()} onOpenChange={setOpen}>
        受控菜单
      </Dropdown>
      <output>菜单状态：{open() ? '打开' : '关闭'}</output>
      <Dropdown items={items} onOpenChange={setUncontrolledOpen}>
        非受控菜单
      </Dropdown>
      <output>非受控菜单状态：{uncontrolledOpen() ? '打开' : '关闭'}</output>
    </div>
  )
}
