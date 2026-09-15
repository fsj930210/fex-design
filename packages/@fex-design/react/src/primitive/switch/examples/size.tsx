import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/react/primitive/switch'

export default function Example() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">rounded</span>
        <div className="flex flex-wrap items-center gap-3">
          <SwitchRoot shape="rounded" size="sm" defaultChecked aria-label="rounded sm">
            <SwitchThumb />
          </SwitchRoot>
          <SwitchRoot shape="rounded" size="md" defaultChecked aria-label="rounded md">
            <SwitchThumb />
          </SwitchRoot>
          <SwitchRoot shape="rounded" size="lg" defaultChecked aria-label="rounded lg">
            <SwitchThumb />
          </SwitchRoot>
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">pill</span>
        <div className="flex flex-wrap items-center gap-3">
          <SwitchRoot shape="pill" size="sm" defaultChecked aria-label="pill sm">
            <SwitchThumb />
          </SwitchRoot>
          <SwitchRoot shape="pill" size="md" defaultChecked aria-label="pill md">
            <SwitchThumb />
          </SwitchRoot>
          <SwitchRoot shape="pill" size="lg" defaultChecked aria-label="pill lg">
            <SwitchThumb />
          </SwitchRoot>
        </div>
      </section>
    </div>
  )
}
