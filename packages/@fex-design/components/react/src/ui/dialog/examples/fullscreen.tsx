import { useState } from 'react'
import { Dialog } from '..'
import { Button } from '../../button'
export function DialogFullscreenExample() {
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'viewport' | 'screen'>('viewport')
  return (
    <>
      <Button onClick={() => setMode(mode === 'viewport' ? 'screen' : 'viewport')}>
        切换为 {mode === 'viewport' ? '浏览器全屏' : '视口全屏'}
      </Button>
      <Button onClick={() => setOpen(true)}>打开 Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen} fullscreen={{ mode }} title="全屏">
        全屏内容。
      </Dialog>
    </>
  )
}
