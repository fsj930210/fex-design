import { createSignal } from 'solid-js'
import { Dropdown } from '@fex-design/solid/ui/dropdown'
export function DropdownSemanticStylesExample() {
  let container: HTMLDivElement | undefined
  const [value, setValue] = createSignal('尚未选择')
  const items = [
    { value: 'rename', label: '重命名' },
    { value: 'duplicate', label: '复制' },
    { value: 'archive', label: '归档', disabled: true },
  ]
  const popoverProps = { getPopupContainer: () => container ?? null }
  return (
    <div class="flex min-h-48 flex-col items-start gap-4 p-6">
      <div
        ref={container}
        class="[&_[role=menu]]:border-blue-500 [&_[role=menu]]:bg-blue-50 [&_[role=menu]]:text-blue-950 [&_[role=menuitem]]:font-semibold [&_[role=menuitem]]:hover:bg-blue-200"
      >
        <Dropdown
          items={items}
          popoverProps={popoverProps}
          onActivate={(info) => setValue(info.value)}
        >
          操作
        </Dropdown>
      </div>
      <output>最近操作：{value()}</output>
    </div>
  )
}
