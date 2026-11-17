import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogCssVariablesExample() {
  const [open, setOpen] = createSignal(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog
        open={open()}
        onOpenChange={setOpen}
        title="CSS Variables"
        classNames={{
          content:
            '[--dialog-header-background:var(--color-blue-100)] [--dialog-content-background:var(--color-blue-50)] [--dialog-footer-background:var(--color-indigo-100)]',
        }}
      >
        <p>通过 CSS 变量分别设置标题区、正文和页脚的背景色。</p>
      </Dialog>
    </>
  )
}
