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
export function DialogSemanticStylesExample() {
  const [open, setOpen] = createSignal(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <DialogRoot open={open()} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent class="top-[80px] left-[24px] translate-x-0 translate-y-0 w-[calc(100%-48px)] max-w-[480px]">
            <DialogHeader class="bg-blue-100">
              <DialogTitle class="text-xl text-blue-900">Semantic Styles</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody class="bg-blue-50 p-8 text-base text-blue-950">
              通过结构化样式设置 top: 80px、left: 24px，并分别定制标题区、正文和页脚的颜色。
            </DialogBody>
            <DialogFooter class="justify-start gap-4 bg-indigo-100">
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
