import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/react/primitive/anchor'
import { useRef } from 'react'
const steps = [
  ['prepare', '准备工作'],
  ['install', '安装'],
  ['configure', '配置'],
  ['finish', '完成'],
] as const
export function ProgressExample() {
  const container = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={container}
      className="grid h-80 w-full max-w-2xl grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4"
    >
      <AnchorRoot
        activeMode="progress"
        container={() => container.current!}
        className="sticky top-0 self-start"
      >
        <AnchorRail>
          <AnchorIndicator />
        </AnchorRail>
        <AnchorList>
          {steps.map(([key, title]) => (
            <AnchorItem key={key} value={key} target={`#anchor-progress-${key}`}>
              <AnchorLink>{title}</AnchorLink>
            </AnchorItem>
          ))}
        </AnchorList>
      </AnchorRoot>
      <div className="grid gap-24 pb-48">
        {steps.map(([key, title]) => (
          <section id={`anchor-progress-${key}`} key={key}><h3 className="font-semibold">
            {title}
          </h3></section>
        ))}
      </div>
    </div>
  )
}
