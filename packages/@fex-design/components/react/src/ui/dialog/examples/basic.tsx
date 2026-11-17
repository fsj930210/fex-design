import { useState } from 'react'
import { Button } from '@fex-design/react/ui/button'
import { Dialog } from '@fex-design/react/ui/dialog'
export function DialogBasicExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} title="基础 Dialog">
        这是 Dialog 内容。
      </Dialog>
    </>
  )
}
