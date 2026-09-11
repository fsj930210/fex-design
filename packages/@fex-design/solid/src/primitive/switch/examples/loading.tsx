import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/solid/primitive/switch'
import { Spinner } from '@fex-design/solid/primitive/spinner'

export default function Example() {
  
  return <div class="grid gap-6 sm:grid-cols-2"><section class="grid gap-2">
  <span class="text-sm text-muted-foreground">rounded</span>
  <div class="flex flex-wrap items-center gap-3"><SwitchRoot shape="rounded" loading aria-label="rounded 关闭加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot><SwitchRoot shape="rounded" loading defaultChecked aria-label="rounded 开启加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot></div>
</section><section class="grid gap-2">
  <span class="text-sm text-muted-foreground">pill</span>
  <div class="flex flex-wrap items-center gap-3"><SwitchRoot shape="pill" loading aria-label="pill 关闭加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot><SwitchRoot shape="pill" loading defaultChecked aria-label="pill 开启加载"><SwitchThumb><Spinner /></SwitchThumb></SwitchRoot></div>
</section></div>
}
