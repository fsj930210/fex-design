import { createSignal } from 'solid-js'
import { Button } from '@fex-design/solid/primitive/button'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '@fex-design/solid/primitive/dialog'
export function DialogCustomFooterExample(){const [open,setOpen]=createSignal(false);return <><Button onClick={()=>setOpen(true)}>打开 Dialog</Button><DialogRoot open={open()} onOpenChange={setOpen}><DialogPortal><DialogOverlay/><DialogContent><DialogHeader><DialogTitle>自定义 Footer</DialogTitle><DialogClose/></DialogHeader><DialogBody>Dialog custom-footer 场景。</DialogBody><DialogFooter><DialogClose>取消</DialogClose><Button>保存草稿</Button><Button variant="solid" color="primary">确定</Button></DialogFooter></DialogContent></DialogPortal></DialogRoot></>}

