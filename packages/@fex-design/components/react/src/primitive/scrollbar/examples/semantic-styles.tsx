import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/react/primitive/scrollbar'
import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
export function ScrollbarSemanticStylesExample() {
  return (
    <div className="flex w-full flex-wrap gap-6">
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">各轴部件独立设置 classNames/styles</h4>
        <ScrollbarRoot
          showTrack
          autoHide="never"
          overflow={{ x: 'auto', y: 'auto' }}
          className="h-48 w-72 rounded-md border"
        >
          <ScrollbarViewport
            className="bg-muted-background/30"
            style={{ backgroundColor: 'var(--background)' }}
          >
            <div className="grid w-[40rem] gap-3 p-4">
              {scrollbarDemoLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis="x" className="z-20" style={{ insetInlineStart: '16px' }}>
            <ScrollbarTrack axis="x" className="bg-primary/15" style={{ borderRadius: '4px' }}>
              <ScrollbarThumb axis="x" className="bg-primary" style={{ borderRadius: '4px' }} />
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis="y" className="z-20" style={{ top: '16px' }}>
            <ScrollbarTrack axis="y" className="bg-primary/15" style={{ borderRadius: '4px' }}>
              <ScrollbarThumb axis="y" className="bg-primary" style={{ borderRadius: '4px' }} />
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner className="bg-primary/15" style={{ borderRadius: '2px' }} />
        </ScrollbarRoot>
      </section>
    </div>
  )
}
