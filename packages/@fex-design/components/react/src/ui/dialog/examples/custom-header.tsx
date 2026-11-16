import { useState } from 'react'
import { Button } from '@fex-design/react/ui/button'
import { Dialog } from '@fex-design/react/ui/dialog'

export function DialogCustomHeaderExample() {
  const [open, setOpen] = useState(false)
  return <><Button onClick={() => setOpen(true)}>打开 Dialog</Button><Dialog open={open} onOpenChange={setOpen} title="自定义标题" header={<div className="text-sm font-normal text-muted-foreground">这是自定义 Header 内容</div>}>Dialog custom-header 场景。</Dialog></>
}
