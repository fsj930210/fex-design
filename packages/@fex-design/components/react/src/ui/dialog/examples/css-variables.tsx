import { useState } from 'react'
import { Dialog } from '@fex-design/react/ui/dialog'
import { Button } from '@fex-design/react/ui/button'
export function DialogCssVariablesExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="CSS Variables"
        classNames={{
          content:
            '[--dialog-header-background:var(--color-blue-100)] [--dialog-content-background:var(--color-blue-50)] [--dialog-footer-background:var(--color-indigo-100)]',
        }}
      >
        通过 CSS 变量分别设置标题区、正文和页脚的背景色。
      </Dialog>
    </>
  )
}
