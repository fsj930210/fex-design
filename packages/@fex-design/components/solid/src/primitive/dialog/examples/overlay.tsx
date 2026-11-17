import { createSignal } from 'solid-js'
import { Button } from '@fex-design/solid/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
  DialogFullscreenToggle,
} from '@fex-design/solid/primitive/dialog'
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
      <DialogRoot
        modal={modal()}
        open={open()}
        onOpenChange={setOpen}
        closeOnOverlayClick={closable()}
      >
        <DialogPortal>
          {overlay() && <DialogOverlay />}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Overlay</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>测试 Overlay 显示和关闭行为。</DialogBody>
            <DialogFooter>
              <DialogClose>取消</DialogClose>
              <Button variant="solid" color="primary">
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
