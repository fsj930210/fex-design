import { Badge } from '@fex-design/solid/primitive/badge'
const Item = (props: { dir: 'ltr' | 'rtl'; label: string }) => (
  <div dir={props.dir} class="grid justify-items-center gap-2">
    <span>{props.label}</span>
    <span class="relative inline-flex">
      <span class="block size-10 rounded bg-muted-background" />
      <Badge
        count={5}
        class="absolute end-0 top-0 z-10 -translate-y-1/2 translate-x-1/2 rtl:-translate-x-1/2"
      />
    </span>
  </div>
)
export function Direction() {
  return (
    <div class="flex items-center justify-center gap-12">
      <Item dir="ltr" label="LTR" />
      <Item dir="rtl" label="RTL" />
    </div>
  )
}
