import { Switch } from '@fex-design/react/ui/switch'

export default function Example() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">rounded</span>
        <div className="flex flex-wrap items-center gap-3">
          <Switch shape="rounded" disabled aria-label="rounded 禁用关闭"></Switch>
          <Switch shape="rounded" disabled defaultChecked aria-label="rounded 禁用开启"></Switch>
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">pill</span>
        <div className="flex flex-wrap items-center gap-3">
          <Switch shape="pill" disabled aria-label="pill 禁用关闭"></Switch>
          <Switch shape="pill" disabled defaultChecked aria-label="pill 禁用开启"></Switch>
        </div>
      </section>
    </div>
  )
}
