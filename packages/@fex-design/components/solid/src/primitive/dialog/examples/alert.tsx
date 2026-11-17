import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
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
export function DialogAlertExample() {
  const [open, setOpen] = createSignal(false)
  const [result, setResult] = createSignal('尚未操作')
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开提示弹窗</Button>
      <p role="status">{result()}</p>
      <DialogRoot
        closeOnEscape={false}
        closeOnOverlayClick={false}
        open={open()}
        onOpenChange={(value) => {
          if (!value) setResult('已取消')
          setOpen(value)
        }}
      >
        <DialogPortal>
          <DialogOverlay />
          <DialogContent class={dialogMessageClassName}>
            <DialogHeader class="border-0">
              <DialogTitle>操作成功</DialogTitle>
            </DialogHeader>
            <DialogBody>资料已经保存，可以继续操作。</DialogBody>
            <DialogFooter class="border-0">
              <Button
                variant="solid"
                color="primary"
                onClick={() => {
                  setResult('已确认')
                  setOpen(false)
                }}
              >
                确定
              </Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
