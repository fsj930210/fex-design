import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/solid/primitive/switch'

export default function Example() {
  
  return <div class="grid gap-6 sm:grid-cols-2"><section class="grid gap-2">
  <span class="text-sm text-muted-foreground">rounded</span>
  <div class="flex flex-wrap items-center gap-3"><div><SwitchRoot shape="rounded" aria-invalid="true" aria-describedby="rounded-error" aria-label="rounded 安全验证"><SwitchThumb /></SwitchRoot><p id="rounded-error" class="mt-2 text-sm text-danger">必须开启安全验证才能继续。</p></div></div>
</section><section class="grid gap-2">
  <span class="text-sm text-muted-foreground">pill</span>
  <div class="flex flex-wrap items-center gap-3"><div><SwitchRoot shape="pill" aria-invalid="true" aria-describedby="pill-error" aria-label="pill 安全验证"><SwitchThumb /></SwitchRoot><p id="pill-error" class="mt-2 text-sm text-danger">必须开启安全验证才能继续。</p></div></div>
</section></div>
}
