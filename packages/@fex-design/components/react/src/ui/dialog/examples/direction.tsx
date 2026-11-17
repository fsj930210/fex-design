import { useState } from 'react'
import { Dialog } from '@fex-design/react/ui/dialog'
import { Button } from '@fex-design/react/ui/button'
export function DialogDirectionExample() {
  const [open, setOpen] = useState(false)
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr')
  return (
    <>
      <Button
        onClick={() => {
          setDirection('ltr')
          setOpen(true)
        }}
      >
        打开 LTR
      </Button>
      <Button
        onClick={() => {
          setDirection('rtl')
          setOpen(true)
        }}
      >
        打开 RTL
      </Button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="书写方向"
        classNames={{ content: direction === 'rtl' ? '[direction:rtl]' : '[direction:ltr]' }}
      >
        English: read from left to right. العربية: تُقرأ من اليمين إلى اليسار.
      </Dialog>
    </>
  )
}
