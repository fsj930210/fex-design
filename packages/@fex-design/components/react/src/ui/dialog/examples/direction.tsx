import { useState } from 'react'; import { Dialog } from '..'; import { Button } from '../../button';
export function DialogDirectionExample(){const [open,setOpen]=useState(false);return <div dir="rtl"><Button onClick={()=>setOpen(true)}>打开 Dialog</Button><Dialog open={open} onOpenChange={setOpen} title="方向">Dialog direction 场景。</Dialog></div>}
