import { useState } from 'react'
import { Dialog } from '@fex-design/react/ui/dialog'
import { Button } from '@fex-design/react/ui/button'
export function DialogCustomFooterExample() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="自定义 Footer"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button>保存草稿</Button>
            <Button variant="solid" color="primary">
              确定
            </Button>
          </>
        }
      >
        Dialog custom-footer 场景。
      </Dialog>
    </>
  )
}
