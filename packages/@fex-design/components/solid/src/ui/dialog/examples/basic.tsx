import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogBasicExample() {
  const [open, setOpen] = createSignal(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog open={open()} onOpenChange={setOpen} title="基础 Dialog">
        这是 Dialog 内容。
      </Dialog>
    </>
  )
}
