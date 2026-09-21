import { useSyncExternalStore } from 'react'
import { usePopover } from '@fex-design/react/primitive/popover'
import { Button } from '@fex-design/react/primitive/button'

export function CustomLogicExample() {
  const { overlay } = usePopover()
  const snapshot = useSyncExternalStore(overlay.subscribe, overlay.getSnapshot)
  return (
    <div className="flex items-center gap-3">
      <Button onClick={() => overlay.toggle()}>{snapshot.open ? '关闭' : '打开'}</Button>
      <output>状态：{snapshot.open ? '已打开' : '已关闭'}</output>
    </div>
  )
}
