import { Badge } from '@fex-design/react/primitive/badge'
const Item = ({ dir, label }: { dir: 'ltr' | 'rtl'; label: string }) => (
  <div dir={dir} className="grid justify-items-center gap-2">
    <span>{label}</span>
    <span className="relative inline-flex">
      <span className="block size-10 rounded bg-muted-background" />
      <Badge
        count={5}
        className="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2"
      />
    </span>
  </div>
)
export function Direction() {
  return (
    <div className="flex items-center justify-center gap-12">
      <Item dir="ltr" label="LTR · 中文示例" />
      <Item dir="rtl" label="RTL · مثال عربي" />
    </div>
  )
}
