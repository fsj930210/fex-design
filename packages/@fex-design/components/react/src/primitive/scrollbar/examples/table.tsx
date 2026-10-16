import { useRef } from 'react'
import { useIsomorphicLayoutEffect } from '@fex-design/react/hooks/use-isomorphic-layout-effect'
import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '@fex-design/react/primitive/scrollbar'
import { scrollbarColumns, scrollbarRows, observeScrollbarHeader } from '@fex-design/docs-shared/scrollbar-demo'

export function ScrollbarTableExample() {
  const root = useRef<HTMLDivElement>(null)
  const header = useRef<HTMLTableSectionElement>(null)
  // Subscribe to native table layout changes; cleanup releases the ResizeObserver.
  useIsomorphicLayoutEffect(() => {
    if (root.current && header.current) return observeScrollbarHeader(root.current, header.current)
  }, [])
  return (
    <ScrollbarRoot ref={root} className="h-64 w-full max-w-xl rounded-md border" autoHide="never">
      <ScrollbarViewport role="region" aria-label="Orders" tabIndex={0}>
      <table className="w-full min-w-[900px] table-fixed border-separate border-spacing-0 text-left text-sm">
        <thead ref={header} className="sticky top-0 z-10 bg-background"><tr>{scrollbarColumns.map((column) => <th scope="col" key={column} className="border-b px-4 py-3">{column}</th>)}</tr></thead>
        <tbody>{scrollbarRows.map((row) => <tr key={row.id}><td className="border-b px-4 py-3">{row.id}</td><td className="border-b px-4 py-3">{row.customer}</td><td className="border-b px-4 py-3">{row.address}</td><td className="border-b px-4 py-3">{row.status}</td><td className="border-b px-4 py-3">{row.amount}</td></tr>)}</tbody>
      </table>
      </ScrollbarViewport>
      <ScrollbarBar axis="x" className="end-2"><ScrollbarTrack axis="x"><ScrollbarThumb axis="x" /></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar axis="y" className="bottom-2" style={{ top: "var(--table-header-height)" }}><ScrollbarTrack axis="y"><ScrollbarThumb axis="y" /></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner />
    </ScrollbarRoot>
  )
}
