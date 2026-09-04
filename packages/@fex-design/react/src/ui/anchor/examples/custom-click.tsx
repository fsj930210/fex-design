import { useRef } from 'react'
import { Anchor } from '@fex-design/react/ui/anchor'
const items = [
  { key: 'normal', title: '正常点击并滚动', target: '#react-ui-click-normal' },
  { key: 'blocked', title: '阻止内部滚动', target: '#react-ui-click-blocked' },
]
export function CustomClickExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div ref={container} className="grid h-80 w-full max-w-2xl grid-cols-[14rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
      <Anchor
        items={items}
        container={() => container.current}
        className="sticky top-0 self-start"
        onItemClick={(event, item) => {
          console.log('item click', item)
          if (item.key === 'blocked') event.preventDefault()
        }}
      />
      <div className="grid gap-40 pb-64"><section id="react-ui-click-normal">正常目标</section><section id="react-ui-click-blocked">被阻止的目标</section></div>
    </div>
  )
}
