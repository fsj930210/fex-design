import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarCorner,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/react/primitive/scrollbar'

export function ScrollbarBasicExample() {
  return (
    <ScrollbarRoot
      className="h-48 w-72 rounded-md border"
      autoHide="never"
      overflow={{ x: 'hidden' }}
    >
      <ScrollbarViewport overflow={{ y: 'auto' }}>
        <div className="grid gap-3 p-4">
          {scrollbarDemoLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </ScrollbarViewport>
      <ScrollbarBar axis="y">
        <ScrollbarTrack axis="y">
          <ScrollbarThumb axis="y" />
        </ScrollbarTrack>
      </ScrollbarBar>
      <ScrollbarCorner />
    </ScrollbarRoot>
  )
}
