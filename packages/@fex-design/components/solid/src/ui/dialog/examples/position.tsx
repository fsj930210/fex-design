import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogPositionExample(){const [open,setOpen]=createSignal(false);return <><Button onClick={() => setOpen(true)}>打开 Dialog</Button><Dialog open={open()} onOpenChange={setOpen} title="位置"><p>Dialog position 场景。</p></Dialog></>}
