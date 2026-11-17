import { createSignal } from 'solid-js'
import { Button } from '@fex-design/solid/primitive/button'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogActions,
  DialogClose,
  DialogBody,
  DialogFooter,
} from '@fex-design/solid/primitive/dialog'

export function DialogCloseDelayExample() {
  const [open, setOpen] = createSignal(false)
  const [delay, setDelay] = createSignal(200)
  const [feedback, setFeedback] = createSignal('尚未操作')
  function show(milliseconds: number) {
    setDelay(milliseconds)
    setOpen(true)
    setFeedback('外部设置 open=true')
  }
  function onOpenChange(next: boolean) {
    setOpen(next)
    setFeedback('onOpenChange(' + next + ')')
  }
  function close() {
    setOpen(false)
    setFeedback('外部设置 open=false')
  }
  return (
    <>
      <div class="flex flex-wrap justify-center gap-2">
        <Button onClick={() => show(0)}>打开（0ms）</Button>
        <Button onClick={() => show(200)}>打开（200ms）</Button>
        <Button onClick={() => show(1200)}>打开（1200ms）</Button>
      </div>
      <p role="status">
        open：{String(open())}；closeDelay：{delay()}ms；最近操作：{feedback()}
      </p>
      <DialogRoot open={open()} onOpenChange={onOpenChange} closeDelay={delay()}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent style={{ '--dialog-motion-duration': (open() ? 200 : delay()) + 'ms' }}>
            <DialogHeader>
              <DialogTitle>关闭延迟</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>
              <p>点击右上角关闭，或通过按钮设置 open=false，对比关闭过渡。</p>
              <p>open 会立即变为 false， {delay()}ms 后结束关闭阶段。</p>
            </DialogBody>
            <DialogFooter>
              <Button onClick={close}>设置 open=false</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
