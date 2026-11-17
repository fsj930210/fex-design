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
export function DialogDirectionExample() {
  const [open, setOpen] = useState(false)
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')
  return (
    <>
      <Button
        onClick={() => {
          setDirection('ltr')
          setOpen(true)
        }}
      >
        打开 LTR
      </Button>
      <Button
        onClick={() => {
          setDirection('rtl')
          setOpen(true)
        }}
      >
        打开 RTL
      </Button>
      <DialogRoot open={open} onOpenChange={setOpen}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent className={direction === 'rtl' ? '[direction:rtl]' : '[direction:ltr]'}>
            <DialogHeader>
              <DialogTitle>方向</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogClose />
            </DialogActions>
            <DialogBody>
              English: read from left to right. العربية: تُقرأ من اليمين إلى اليسار.
            </DialogBody>
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
