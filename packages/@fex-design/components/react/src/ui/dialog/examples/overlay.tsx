import { useState } from 'react'; import { Dialog } from '..'; import { Button } from '../../button';
export function DialogOverlayExample(){const [open,setOpen]=useState(false);return <><Button onClick={()=>setOpen(true)}>打开 Dialog</Button><Dialog open={open} onOpenChange={setOpen} title="Overlay">Dialog overlay 场景。</Dialog></>}
