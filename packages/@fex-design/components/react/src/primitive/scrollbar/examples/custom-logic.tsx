import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { useScrollbar, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb } from '@fex-design/react/primitive/scrollbar'

export function ScrollbarCustomLogicExample() {
  const binding = useScrollbar({ autoHide: 'never' })
  return (
    <div ref={binding.rootRef} data-slot="scrollbar-root" className="relative isolate h-48 w-72 overflow-hidden rounded-md border">
      <ScrollbarViewport overflow={{ x: 'hidden' }}>
        <div className="grid gap-3 p-4">
        {scrollbarDemoLines.map((line) => <p key={line}>{line}</p>)}
      </div>
      </ScrollbarViewport>
      <ScrollbarBar axis="y">
        <ScrollbarTrack axis="y">
          <ScrollbarThumb axis="y" />
        </ScrollbarTrack>
      </ScrollbarBar>
    </div>
  )
}
