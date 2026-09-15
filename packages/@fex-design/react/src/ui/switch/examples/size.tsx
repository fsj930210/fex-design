import { Switch } from '@fex-design/react/ui/switch'

export default function Example() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">rounded</span>
        <div className="flex flex-wrap items-center gap-3">
          <Switch shape="rounded" size="sm" defaultChecked aria-label="rounded sm"></Switch>
          <Switch shape="rounded" size="md" defaultChecked aria-label="rounded md"></Switch>
          <Switch shape="rounded" size="lg" defaultChecked aria-label="rounded lg"></Switch>
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">pill</span>
        <div className="flex flex-wrap items-center gap-3">
          <Switch shape="pill" size="sm" defaultChecked aria-label="pill sm"></Switch>
          <Switch shape="pill" size="md" defaultChecked aria-label="pill md"></Switch>
          <Switch shape="pill" size="lg" defaultChecked aria-label="pill lg"></Switch>
        </div>
      </section>
    </div>
  )
}
