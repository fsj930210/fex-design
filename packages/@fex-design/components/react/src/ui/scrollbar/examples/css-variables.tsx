import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import type { CSSProperties } from 'react'
import { Scrollbar } from '@fex-design/react/ui/scrollbar'

export function ScrollbarCssVariablesExample() {
  return <div className="flex w-full flex-wrap gap-6">
  <section className="grid gap-3"><h4 className="text-sm font-medium">尺寸、内边距、圆角、轨道、滑块及交角颜色</h4>
    <Scrollbar showTrack className="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"auto","y":"auto"}} style={{"--scrollbar-size":"12px","--scrollbar-padding":"2px","--scrollbar-radius":"6px","--scrollbar-track-color":"#e0e7ff","--scrollbar-thumb-color":"#6366f1","--scrollbar-thumb-hover-color":"#4f46e5","--scrollbar-thumb-active-color":"#312e81","--scrollbar-corner-color":"#e0e7ff","--scrollbar-transition-duration":"250ms"} as CSSProperties}><div className="grid w-[40rem] gap-3 p-4">{scrollbarDemoLines.map((line) => <p key={line}>{line}</p>)}</div></Scrollbar>
  </section>
  </div>
}
