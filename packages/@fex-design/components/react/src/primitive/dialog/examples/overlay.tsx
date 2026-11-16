import { useState } from 'react'
import { Button } from '@fex-design/react/primitive/button'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '@fex-design/react/primitive/dialog'
export function DialogOverlayExample() { const [open,setOpen]=useState(false); return <><Button onClick={()=>setOpen(true)}>打开 Dialog</Button><DialogRoot open={open} onOpenChange={setOpen}><DialogPortal><DialogOverlay/><DialogContent><DialogHeader><DialogTitle>Overlay</DialogTitle><DialogClose/></DialogHeader><DialogBody>Dialog overlay 场景。</DialogBody><DialogFooter><DialogClose>取消</DialogClose><Button variant="solid" color="primary">确定</Button></DialogFooter></DialogContent></DialogPortal></DialogRoot></> }

