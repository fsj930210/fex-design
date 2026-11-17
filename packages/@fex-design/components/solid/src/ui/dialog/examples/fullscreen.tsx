import { createSignal } from 'solid-js'
import { Dialog } from '@fex-design/solid/ui/dialog'
import { Button } from '@fex-design/solid/ui/button'
export function DialogFullscreenExample() {
  const [open, setOpen] = createSignal(false)
  const [mode, setMode] = createSignal<'viewport' | 'screen'>('viewport')
  return (
    <>
      <Button onClick={() => setMode(mode() === 'viewport' ? 'screen' : 'viewport')}>
        切换为 {mode() === 'viewport' ? '浏览器全屏' : '视口全屏'}
      </Button>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog open={open()} onOpenChange={setOpen} fullscreen={{ mode: mode() }} title="全屏">
        全屏内容。
      </Dialog>
    </>
  )
}
