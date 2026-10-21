import { Menu } from '@fex-design/solid/ui/menu'
import { createSignal } from 'solid-js'
export function MenuBasicExample() {
  const [value, setValue] = createSignal<string[]>([])
  return (
    <div class="grid w-full max-w-xs gap-3">
      <Menu
        onValueChange={(next) => setValue(next)}
        items={[
          { value: 'overview', label: '概览' },
          { value: 'members', label: '成员' },
          { value: 'billing', label: '账单', disabled: true },
        ]}
        aria-label="基本菜单"
      />
      <output>选中值：{JSON.stringify(value())}</output>
    </div>
  )
}
