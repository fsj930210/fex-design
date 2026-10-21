import { Switch } from '@fex-design/react/ui/switch'

export default function Example() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">rounded</span>
        <div className="flex flex-wrap items-center gap-3">
          <Switch
            shape="rounded"
            defaultChecked
            checkedContent="开启"
            uncheckedContent="关闭"
            classNames={{ root: 'ring-2', content: 'font-semibold', thumb: 'shadow-lg' }}
            styles={{
              root: { backgroundColor: '#0f766e', color: '#fff' },
              content: { letterSpacing: '0.08em' },
              thumb: { backgroundColor: '#ccfbf1', color: '#0f766e' },
            }}
            aria-label="rounded 结构化样式"
          />
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">pill</span>
        <div className="flex flex-wrap items-center gap-3">
          <Switch
            shape="pill"
            defaultChecked
            checkedContent="开启"
            uncheckedContent="关闭"
            classNames={{ root: 'ring-2', content: 'font-semibold', thumb: 'shadow-lg' }}
            styles={{
              root: { backgroundColor: '#0f766e', color: '#fff' },
              content: { letterSpacing: '0.08em' },
              thumb: { backgroundColor: '#ccfbf1', color: '#0f766e' },
            }}
            aria-label="pill 结构化样式"
          />
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">加载图标</span>
        <Switch
          loading
          defaultChecked
          className="[--switch-track-checked-background:#0f766e] [--switch-thumb-background:#ccfbf1]"
          spinnerProps={{ className: 'text-violet-600' }}
          aria-label="加载图标"
        />
      </section>
    </div>
  )
}
