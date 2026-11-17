import { useState } from 'react'
import { Dialog } from '@fex-design/react/ui/dialog'
import { Button } from '@fex-design/react/ui/button'
export function DialogPositionExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="位置"
        classNames={{ content: 'top-[200px] translate-y-0' }}
      >
        Dialog position 场景。
      </Dialog>
    </>
  )
}
