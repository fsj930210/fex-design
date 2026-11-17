import { useState } from 'react'
import { Button } from '@fex-design/react/primitive/button'
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
} from '@fex-design/react/primitive/dialog'
export function DialogPositionExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent className="top-[200px] translate-y-0">
            <DialogHeader>
              <DialogTitle>位置</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>Dialog position 场景。</DialogBody>
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
