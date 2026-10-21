import { Spinner } from '@fex-design/react/primitive/spinner'
import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/react/primitive/switch'
import { useState, type CSSProperties } from 'react'

export default function Example() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">rounded</span>
        <div className="flex flex-wrap items-center gap-3">
          <SwitchRoot
            shape="rounded"
            defaultChecked
            style={
              {
                '--switch-track-background': '#dbeafe',
                '--switch-track-checked-background': '#7c3aed',
                '--switch-track-border-color': '#60a5fa',
                '--switch-track-checked-border-color': '#6d28d9',
                '--switch-color': '#1e3a8a',
                '--switch-checked-color': '#ffffff',
                '--switch-thumb-background': '#fef3c7',
                '--switch-thumb-color': '#7c3aed',
              } as CSSProperties
            }
            aria-label="rounded CSS Variables"
          >
            <SwitchContent state="checked">开启</SwitchContent>
            <SwitchContent state="unchecked">关闭</SwitchContent>
            <SwitchThumb />
          </SwitchRoot>
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">pill</span>
        <div className="flex flex-wrap items-center gap-3">
          <SwitchRoot
            shape="pill"
            defaultChecked
            style={
              {
                '--switch-track-background': '#dbeafe',
                '--switch-track-checked-background': '#7c3aed',
                '--switch-track-border-color': '#60a5fa',
                '--switch-track-checked-border-color': '#6d28d9',
                '--switch-color': '#1e3a8a',
                '--switch-checked-color': '#ffffff',
                '--switch-thumb-background': '#fef3c7',
                '--switch-thumb-color': '#7c3aed',
              } as CSSProperties
            }
            aria-label="pill CSS Variables"
          >
            <SwitchContent state="checked">开启</SwitchContent>
            <SwitchContent state="unchecked">关闭</SwitchContent>
            <SwitchThumb />
          </SwitchRoot>
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">加载图标</span>
        <SwitchRoot
          loading
          defaultChecked
          className="[--switch-track-checked-background:#7c3aed] [--switch-thumb-background:#f5f3ff] [--primary:#6d28d9]"
          aria-label="加载图标"
        >
          <SwitchThumb>
            <Spinner className="text-primary" aria-hidden="true" />
          </SwitchThumb>
        </SwitchRoot>
      </section>
    </div>
  )
}
