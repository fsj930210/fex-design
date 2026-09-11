import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/react/primitive/switch'

export default function Example() {
  
  return <div className="grid gap-6 sm:grid-cols-2"><section className="grid gap-2">
  <span className="text-sm text-muted-foreground">两种形状</span>
  <div className="flex flex-wrap items-center gap-3"><SwitchRoot shape="rounded" defaultChecked aria-label="rounded"><SwitchThumb /></SwitchRoot><SwitchRoot shape="pill" defaultChecked aria-label="pill"><SwitchThumb /></SwitchRoot></div>
</section></div>
}
