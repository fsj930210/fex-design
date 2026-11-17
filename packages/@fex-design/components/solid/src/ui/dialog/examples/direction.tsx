import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogDirectionExample() {
  const [open, setOpen] = createSignal(false)
  const [direction, setDirection] = createSignal<'ltr' | 'rtl'>('ltr')
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
        open={open()}
        onOpenChange={setOpen}
        title="书写方向"
        classNames={{ content: direction() === 'rtl' ? '[direction:rtl]' : '[direction:ltr]' }}
      >
        <p>English: read from left to right. العربية: تُقرأ من اليمين إلى اليسار.</p>
      </Dialog>
    </>
  )
}
