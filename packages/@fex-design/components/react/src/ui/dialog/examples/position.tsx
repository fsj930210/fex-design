import { useState } from 'react'; import { Dialog } from '..'; import { Button } from '../../button';
export function DialogPositionExample(){const [open,setOpen]=useState(false);return <><Button onClick={()=>setOpen(true)}>打开 Dialog</Button><Dialog open={open} onOpenChange={setOpen} title="位置" classNames={{content:'top-8 translate-y-0'}}>Dialog position 场景。</Dialog></>}
