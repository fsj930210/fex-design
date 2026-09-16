import { useState } from 'react'
import { Tooltip } from '@fex-design/react/ui/tooltip'
import { Button } from '@fex-design/react/ui/button'
export function ControlledExample() {
  const [open, setOpen] = useState(false)
  return (
    <div className="flex min-h-64 items-center justify-center gap-3">
      <Button onClick={() => setOpen((value) => !value)}>外部{open ? '关闭' : '打开'}</Button>
      <Tooltip open={open} onOpenChange={setOpen} title="状态由调用方管理">
        <Button variant="outlined">受控提示</Button>
      </Tooltip>
    </div>
  )
}
