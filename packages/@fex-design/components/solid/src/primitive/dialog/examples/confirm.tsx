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
export function DialogConfirmExample() {
  const [open, setOpen] = createSignal(false)
  const [result, setResult] = createSignal('尚未操作')
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开确认弹窗</Button>
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
              <DialogTitle>
                <span class="text-danger">确认删除</span>
              </DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>
              <p>
                删除后无法恢复，<strong>请确认是否继续。</strong>
              </p>
            </DialogBody>
            <DialogFooter class="border-0">
              <DialogClose>取消</DialogClose>
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
