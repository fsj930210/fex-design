import { MenuRoot, MenuContent, MenuItem } from '@fex-design/solid/primitive/menu'
import { createSignal } from 'solid-js'
export function MenuBasicExample() {
  const [value, setValue] = createSignal<string[]>([])
  return (
    <div class="grid w-full max-w-xs gap-3">
      <MenuRoot onValueChange={(next) => setValue(next)}>
        <MenuContent aria-label="基本菜单">
          <MenuItem value="overview">概览</MenuItem>
          <MenuItem value="members">成员</MenuItem>
          <MenuItem value="billing" disabled>
            账单
          </MenuItem>
        </MenuContent>
      </MenuRoot>
      <output>选中值：{JSON.stringify(value())}</output>
    </div>
  )
}
