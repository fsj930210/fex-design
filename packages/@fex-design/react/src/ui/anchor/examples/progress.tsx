import { useRef } from 'react'
import { Anchor } from '@fex-design/react/ui/anchor'

const items = [
  ['prepare', '准备工作'],
  ['install', '安装'],
  ['configure', '配置'],
  ['finish', '完成'],
].map(([key, title]) => ({ key: key!, title: title!, target: `#react-ui-progress-${key}` }))

export function ProgressExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={container}
      className="grid h-80 w-full max-w-2xl grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4"
    >
      <Anchor
        items={items}
        activeMode="progress"
       
        container={() => container.current}
        className="sticky top-0 self-start"
      />
      <div className="grid gap-24 pb-48">
        {items.map((item) => (
          <section key={item.key} id={`react-ui-progress-${item.key}`}><h3 className="font-semibold">
            {item.title}
          </h3></section>
        ))}
      </div>
    </div>
  )
}
