import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/solid/primitive/switch'

export default function Example() {
  return (
    <div class="grid gap-6 sm:grid-cols-2">
      <section class="grid gap-2">
        <span class="text-sm text-muted-foreground">rounded</span>
        <div class="flex flex-wrap items-center gap-3">
          <SwitchRoot shape="rounded" aria-label="rounded 关闭">
            <SwitchThumb />
          </SwitchRoot>
          <SwitchRoot shape="rounded" defaultChecked aria-label="rounded 开启">
            <SwitchThumb />
          </SwitchRoot>
        </div>
      </section>
      <section class="grid gap-2">
        <span class="text-sm text-muted-foreground">pill</span>
        <div class="flex flex-wrap items-center gap-3">
          <SwitchRoot shape="pill" aria-label="pill 关闭">
            <SwitchThumb />
          </SwitchRoot>
          <SwitchRoot shape="pill" defaultChecked aria-label="pill 开启">
            <SwitchThumb />
          </SwitchRoot>
        </div>
      </section>
    </div>
  )
}
