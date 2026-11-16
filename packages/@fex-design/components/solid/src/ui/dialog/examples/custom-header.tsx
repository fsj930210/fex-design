import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogCustomHeaderExample(){const [open,setOpen]=createSignal(false);return <><Button onClick={() => setOpen(true)}>打开 Dialog</Button><Dialog open={open()} onOpenChange={setOpen} title="自定义标题" header={<div class="text-sm font-normal text-muted-foreground">这是自定义 Header 内容</div>}><p>Dialog custom-header 场景。</p></Dialog></>}
