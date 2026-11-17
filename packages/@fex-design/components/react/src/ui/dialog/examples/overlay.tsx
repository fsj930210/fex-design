import { useState } from 'react'
import { Dialog } from '..'
import { Button } from '../../button'
export function DialogOverlayExample() {
  const [open, setOpen] = useState(false)
  const [modal, setModal] = useState(true)
  const [overlay, setOverlay] = useState(true)
  const [closable, setClosable] = useState(false)
  return (
    <>
      <Button onClick={() => setModal(!modal)}>模态：{modal ? '是' : '否'}</Button>
      <Button onClick={() => setOverlay(!overlay)}>Overlay：{overlay ? '有' : '无'}</Button>
      <Button onClick={() => setClosable(!closable)}>
        Overlay 点击关闭：{closable ? '开' : '关'}
      </Button>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <span>状态：{open ? '打开' : '关闭'}</span>
      <Dialog
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        overlay={overlay}
        closeOnOverlayClick={closable}
        title="Overlay"
      >
        测试 Overlay 显示和关闭行为。
      </Dialog>
    </>
  )
}
