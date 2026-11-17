import { useState } from 'react'
import { Dialog } from '@fex-design/react/ui/dialog'
import { Button } from '@fex-design/react/ui/button'
export function DialogSemanticStylesExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Semantic Styles"
        classNames={{
          content:
            'top-[80px] left-[24px] translate-x-0 translate-y-0 w-[calc(100%-48px)] max-w-[480px]',
          header: 'bg-blue-100',
          title: 'text-xl text-blue-900',
          body: 'bg-blue-50 p-8 text-base text-blue-950',
          footer: 'justify-start gap-4 bg-indigo-100',
        }}
      >
        通过结构化样式设置 top: 80px、left: 24px，并分别定制标题区、正文和页脚的颜色。
      </Dialog>
    </>
  )
}
