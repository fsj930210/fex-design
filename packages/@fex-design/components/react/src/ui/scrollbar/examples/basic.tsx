import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import { Scrollbar } from '@fex-design/react/ui/scrollbar'

export function ScrollbarBasicExample() {
  return (
    <Scrollbar
      className="h-48 w-72 rounded-md border"
      autoHide="never"
      overflow={{ x: 'hidden' }}
      viewportProps={{ overflow: { y: 'auto' } }}
    >
      <div className="grid gap-3 p-4">
        {scrollbarDemoLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
    </Scrollbar>
  )
}
