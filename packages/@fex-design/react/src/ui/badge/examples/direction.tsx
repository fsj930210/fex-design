import { Badge } from '@fex-design/react/ui/badge'
const Item = ({ dir, label }: { dir: 'ltr' | 'rtl'; label: string }) => (
  <div dir={dir} className="grid justify-items-center gap-2">
    <span>{label}</span>
    <Badge count={5}>
      <span className="block size-10 rounded bg-muted-background" />
    </Badge>
  </div>
)
export function Direction() {
  return (
    <div className="flex items-center justify-center gap-12">
      <Item dir="ltr" label="LTR" />
      <Item dir="rtl" label="RTL" />
    </div>
  )
}
