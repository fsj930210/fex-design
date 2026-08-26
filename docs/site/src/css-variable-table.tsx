import { For } from 'solid-js'
import type { ComponentApi } from './types'

export function CssVariableTable(props: { value: NonNullable<ComponentApi['cssVariables']> }) {
  return (
    <div class="mt-5 overflow-hidden rounded-lg border border-border">
      <div class="grid grid-cols-[220px_1fr] gap-4 bg-muted-background px-4 py-3 text-[13px] font-semibold">
        <span>变量</span>
        <span>用途</span>
      </div>
      <For each={props.value}>
        {(variable) => (
          <div class="grid grid-cols-[220px_1fr] gap-4 border-t border-border px-4 py-3 text-[13px]">
            <code class="text-primary">{variable.name}</code>
            <span>{variable.description}</span>
          </div>
        )}
      </For>
    </div>
  )
}
