import { useState } from 'react'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from '@fex-design/react/primitive/dialog'
import { Button } from '../../button'
import { useDraggable } from '@fex-design/react/hooks/use-draggable'
import { useResize } from '@fex-design/react/hooks/use-resize'
import { useComposedRef } from '@fex-design/react/hooks/use-composed-ref'

export function DialogAdvancedExample() {
  const [open, setOpen] = useState(false)
  const [minimized, setMinimized] = useState(false)
  const [maximized, setMaximized] = useState(false)
  const resize = useResize({ defaultRect: { x: 0, y: 0, width: 520, height: 320 }, minWidth: 320, maxWidth: 860, minHeight: 220, maxHeight: 620, bounds: 'viewport' })
  const move = useDraggable({ id: 'dialog-advanced', type: 'dialog' })
  const ref = useComposedRef(resize.getTargetProps().ref, move.getDragProps().ref)
  const sizeStyle = maximized ? { width: '100vw', height: '100vh' } : resize.style
  return <>
    <Button onClick={() => setOpen(true)}>打开高级 Dialog</Button>
    <DialogRoot open={open} onOpenChange={setOpen}>
      <DialogPortal><DialogOverlay /><DialogContent ref={ref} className="max-w-none" style={{ ...sizeStyle, display: minimized ? 'none' : undefined }}>
        <DialogHeader><div {...move.getHandleProps()} className="cursor-move"><DialogTitle>高级交互</DialogTitle></div><Button onClick={() => setMinimized((value) => !value)}>{minimized ? '恢复' : '最小化'}</Button><Button onClick={() => setMaximized((value) => !value)}>{maximized ? '还原' : '最大化'}</Button><DialogClose /></DialogHeader>
        <DialogBody>Dialog advanced 场景。</DialogBody>
        {!minimized && <div className="pointer-events-auto absolute inset-0" {...resize.getHandleProps('bottom-right')} />}<DialogFooter><DialogClose>取消</DialogClose><Button variant="solid" color="primary">确定</Button></DialogFooter>
      </DialogContent></DialogPortal>
    </DialogRoot>
  </>
}
