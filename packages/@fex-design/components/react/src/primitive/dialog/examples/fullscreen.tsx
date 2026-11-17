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
export function DialogFullscreenExample() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'viewport' | 'screen'>('viewport')
  return (
    <>
      <Button onClick={() => setMode(mode === 'viewport' ? 'screen' : 'viewport')}>
        切换为 {mode === 'viewport' ? '浏览器全屏' : '视口全屏'}
      </Button>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <DialogRoot open={open} onOpenChange={setOpen} fullscreen={{ mode }}>
        <DialogPortal>
          <DialogOverlay />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>全屏</DialogTitle>
            </DialogHeader>
            <DialogActions>
              <DialogFullscreenToggle />
              <DialogClose />
            </DialogActions>
            <DialogBody>全屏内容。</DialogBody>
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
