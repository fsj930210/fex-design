import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/react/ui/scrollbar'

export function ScrollbarStylingExample() {
  return (
    <div className="flex w-full flex-wrap gap-6">
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">各轴部件独立设置 classNames/styles</h4>
        <Scrollbar
          showTrack
          className="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
          classNames={{
            viewport: 'bg-muted-background/30',
            barX: 'z-20',
            barY: 'z-20',
            trackX: 'bg-primary/15',
            trackY: 'bg-primary/15',
            thumbX: 'bg-primary',
            thumbY: 'bg-primary',
            corner: 'bg-primary/15',
          }}
          styles={{
            viewport: { backgroundColor: 'var(--background)' },
            barX: { insetInlineStart: '16px' },
            barY: { top: '16px' },
            trackX: { borderRadius: '4px' },
            trackY: { borderRadius: '4px' },
            thumbX: { borderRadius: '4px' },
            thumbY: { borderRadius: '4px' },
            corner: { borderRadius: '2px' },
          }}
        >
          <div className="grid w-[40rem] gap-3 p-4">
            {scrollbarDemoLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </Scrollbar>
      </section>
    </div>
  )
}
