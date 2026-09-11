import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/solid/primitive/switch'
import { createSignal, type JSX } from 'solid-js'
import { Button } from '@fex-design/solid/ui/button'

export default function Example() {
  const [roundedChecked, setRoundedChecked] = createSignal(false)
  const [pillChecked, setPillChecked] = createSignal(false)
  return <div class="grid gap-6 sm:grid-cols-2"><section class="grid justify-items-start gap-2">
  <span class="text-sm text-muted-foreground">rounded</span>
  <div class="flex flex-wrap items-center gap-3"><div class="grid justify-items-start gap-2"><span class="text-xs">非受控</span><SwitchRoot shape="rounded" aria-label="rounded 非受控"><SwitchThumb /></SwitchRoot><span class="mt-2 text-xs">受控</span><SwitchRoot shape="rounded" checked={roundedChecked()} onChange={setRoundedChecked} aria-label="rounded 受控"><SwitchThumb /></SwitchRoot><div class="flex gap-2"><Button size="sm" onClick={() => setRoundedChecked(true)}>开启</Button><Button size="sm" onClick={() => setRoundedChecked(false)}>关闭</Button></div></div></div>
</section><section class="grid justify-items-start gap-2">
  <span class="text-sm text-muted-foreground">pill</span>
  <div class="flex flex-wrap items-center gap-3"><div class="grid justify-items-start gap-2"><span class="text-xs">非受控</span><SwitchRoot shape="pill" aria-label="pill 非受控"><SwitchThumb /></SwitchRoot><span class="mt-2 text-xs">受控</span><SwitchRoot shape="pill" checked={pillChecked()} onChange={setPillChecked} aria-label="pill 受控"><SwitchThumb /></SwitchRoot><div class="flex gap-2"><Button size="sm" onClick={() => setPillChecked(true)}>开启</Button><Button size="sm" onClick={() => setPillChecked(false)}>关闭</Button></div></div></div>
</section></div>
}
