import { useRef } from 'react'
import { Dropdown } from '@fex-design/react/ui/dropdown'
export function DropdownContainerExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div className="grid gap-3 p-6">
      <p>浮层挂载到虚线区域，定位仍以触发器为参照。</p>
      <div ref={container} className="relative min-h-48 rounded-lg border-2 border-dashed p-6">
        <Dropdown
          items={[
            { value: 'rename', label: '重命名' },
            { value: 'duplicate', label: '复制' },
          ]}
          popoverProps={{ getPopupContainer: () => container.current }}
        >
          操作
        </Dropdown>
      </div>
    </div>
  )
}
