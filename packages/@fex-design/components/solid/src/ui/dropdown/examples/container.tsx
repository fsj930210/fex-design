import { Dropdown } from '@fex-design/solid/ui/dropdown'
export function DropdownContainerExample() {
  let container: HTMLDivElement | undefined
  const popoverProps = { getPopupContainer: () => container ?? null }
  const items = [
    { value: 'rename', label: '重命名' },
    { value: 'duplicate', label: '复制' },
  ]
  return (
    <div class="grid gap-3 p-6">
      <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
      <div ref={container} class="relative min-h-48 rounded-lg border-2 border-dashed p-6">
        <Dropdown items={items} popoverProps={popoverProps}>
          操作
        </Dropdown>
      </div>
    </div>
  )
}
