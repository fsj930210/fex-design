import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogCustomFooterExample(){const [open,setOpen]=createSignal(false);return <><Button onClick={() => setOpen(true)}>打开 Dialog</Button><Dialog open={open()} onOpenChange={setOpen} title="自定义 Footer" footer={<><Button>取消</Button><Button>保存草稿</Button><Button variant="solid" color="primary">确定</Button></>}><p>Dialog custom-footer 场景。</p></Dialog></>}
