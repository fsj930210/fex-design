import { scrollbarViewportLines } from '@fex-design/docs-shared/scrollbar-demo'
import { useRef, useState } from 'react'
import { Scrollbar } from '@fex-design/react/ui/scrollbar'
import { Button } from '@fex-design/react/ui/button'

export function ScrollbarViewportExample() {
  const viewport = useRef<HTMLDivElement>(null)
  const [lastKey, setLastKey] = useState('尚未按键')
  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => viewport.current?.scrollTo({ top: 0 })}>回到顶部</Button>
        <Button onClick={() => viewport.current?.scrollBy({ top: 120 })}>向下 120px</Button>
        <Button
          onClick={() => viewport.current?.scrollTo({ top: viewport.current?.scrollHeight ?? 0 })}
        >
          滚动到底部
        </Button>
      </div>
      <Scrollbar
        className="h-48 w-72 rounded-md border"
        autoHide="never"
        overflow={{ x: 'hidden' }}
        viewportProps={{
          role: 'region',
          'aria-label': '可通过键盘滚动的内容',
          tabIndex: 0,
          className:
            'outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
          onKeyDown: (event) => setLastKey(event.key),
          ref: viewport,
        }}
      >
        <div className="grid gap-3 p-4">
          {scrollbarViewportLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </Scrollbar>
      <output className="text-sm text-muted-foreground">最近按键：{lastKey}</output>
    </div>
  )
}
