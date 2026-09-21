import { Badge } from '@fex-design/solid/ui/badge'
const Item = (props: { dir: 'ltr' | 'rtl'; label: string }) => (
  <div dir={props.dir} class="grid justify-items-center gap-2">
    <span>{props.label}</span>
    <Badge count={5}>
      <span class="block size-10 rounded bg-muted-background" />
    </Badge>
  </div>
)
export function Direction() {
  return (
    <div class="flex items-center justify-center gap-12">
      <Item dir="ltr" label="LTR · 中文示例" />
      <Item dir="rtl" label="RTL · مثال عربي" />
    </div>
  )
}
