import { Switch } from '@fex-design/react/ui/switch'
import { useState, type CSSProperties } from 'react'

export default function Example() {
  
  return <div className="grid gap-6 sm:grid-cols-2"><section className="grid gap-2">
  <span className="text-sm text-muted-foreground">rounded</span>
  <div className="flex flex-wrap items-center gap-3"><Switch shape="rounded" defaultChecked checkedContent="开启" uncheckedContent="关闭" style={{ '--switch-track-background': '#dbeafe', '--switch-track-checked-background': '#7c3aed', '--switch-track-border-color': '#60a5fa', '--switch-track-checked-border-color': '#6d28d9', '--switch-color': '#1e3a8a', '--switch-checked-color': '#ffffff', '--switch-thumb-background': '#fef3c7', '--switch-thumb-color': '#7c3aed' } as CSSProperties} aria-label="rounded CSS Variables" /></div>
</section><section className="grid gap-2">
  <span className="text-sm text-muted-foreground">pill</span>
  <div className="flex flex-wrap items-center gap-3"><Switch shape="pill" defaultChecked checkedContent="开启" uncheckedContent="关闭" style={{ '--switch-track-background': '#dbeafe', '--switch-track-checked-background': '#7c3aed', '--switch-track-border-color': '#60a5fa', '--switch-track-checked-border-color': '#6d28d9', '--switch-color': '#1e3a8a', '--switch-checked-color': '#ffffff', '--switch-thumb-background': '#fef3c7', '--switch-thumb-color': '#7c3aed' } as CSSProperties} aria-label="pill CSS Variables" /></div>
</section></div>
}
