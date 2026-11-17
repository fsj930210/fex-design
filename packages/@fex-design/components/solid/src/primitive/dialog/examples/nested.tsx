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
} from '@fex-design/solid/primitive/dialog'

export function DialogNestedExample() {
  const [open, setOpen] = createSignal(false)
  const [innerOpen, setInnerOpen] = createSignal(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开外层弹窗</Button>
      <DialogRoot open={open()} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>外层弹窗</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>
              <p>外层内容会保留。</p>
              <Button onClick={() => setInnerOpen(true)}>打开内层弹窗</Button>
              <DialogRoot open={innerOpen()} onOpenChange={setInnerOpen}>
                <DialogPortal>
                  <DialogOverlay />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>内层弹窗</DialogTitle>
                    </DialogHeader>
                    <DialogActions>
                      <DialogClose />
                    </DialogActions>
                    <DialogBody>关闭此弹窗后，外层弹窗仍然保留。</DialogBody>
                    <DialogFooter>
                      <Button onClick={() => setInnerOpen(false)}>关闭内层</Button>
                    </DialogFooter>
                  </DialogContent>
                </DialogPortal>
              </DialogRoot>
            </DialogBody>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>关闭外层</Button>
            </DialogFooter>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
    </>
  )
}
