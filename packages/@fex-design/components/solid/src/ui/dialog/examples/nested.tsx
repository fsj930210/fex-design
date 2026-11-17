import { createSignal } from 'solid-js'
import { Button } from '@fex-design/solid/ui/button'
import { Dialog } from '@fex-design/solid/ui/dialog'

export function DialogNestedExample() {
  const [open, setOpen] = createSignal(false)
  const [innerOpen, setInnerOpen] = createSignal(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开外层弹窗</Button>
      <Dialog
        open={open()}
        onOpenChange={setOpen}
        title="外层弹窗"
        footer={<Button onClick={() => setOpen(false)}>关闭外层</Button>}
      >
        <p>外层内容会保留。</p>
        <Button onClick={() => setInnerOpen(true)}>打开内层弹窗</Button>
        <Dialog
          open={innerOpen()}
          onOpenChange={setInnerOpen}
          title="内层弹窗"
          footer={<Button onClick={() => setInnerOpen(false)}>关闭内层</Button>}
        >
          关闭此弹窗后，外层弹窗仍然保留。
        </Dialog>
      </Dialog>
    </>
  )
}
