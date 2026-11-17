import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogOverlayExample() {
  const [open, setOpen] = createSignal(false)
  const [modal, setModal] = createSignal(true)
  const [overlay, setOverlay] = createSignal(true)
  const [closable, setClosable] = createSignal(false)
  return (
    <>
      <Button onClick={() => setModal(!modal())}>模态：{modal() ? '是' : '否'}</Button>
      <Button onClick={() => setOverlay(!overlay())}>Overlay：{overlay() ? '有' : '无'}</Button>
      <Button onClick={() => setClosable(!closable())}>
        Overlay 点击关闭：{closable() ? '开' : '关'}
      </Button>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <span>状态：{open() ? '打开' : '关闭'}</span>
      <Dialog
        modal={modal()}
        open={open()}
        onOpenChange={setOpen}
        overlay={overlay()}
        closeOnOverlayClick={closable()}
        title="Overlay"
      >
        测试 Overlay 显示和关闭行为。
      </Dialog>
    </>
  )
}
