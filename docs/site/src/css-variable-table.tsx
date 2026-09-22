import { For } from 'solid-js'
import type { ComponentApi } from './types'

function parseVariableNames(raw: string): string[] {
  return raw
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean)
}

export function CssVariableTable(props: { value: NonNullable<ComponentApi['cssVariables']> }) {
  return (
    <div class="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      <div class="grid grid-cols-[280px_1fr] max-[640px]:grid-cols-1 gap-4 border-b border-border bg-muted/40 px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        <span>CSS 变量</span>
        <span>用途与说明</span>
      </div>
      <For each={props.value}>
        {(variable) => {
          const names = parseVariableNames(variable.name)
          return (
            <div class="grid grid-cols-[280px_1fr] max-[640px]:grid-cols-1 gap-4 border-b border-border/60 last:border-b-0 px-4 py-3 text-xs items-start hover:bg-muted/20 transition-colors">
              <div class="flex flex-col gap-1">
                <For each={names}>
                  {(name) => (
                    <span class="font-mono text-xs text-foreground font-medium select-all">
                      {name}
                    </span>
                  )}
                </For>
              </div>
              <div class="leading-relaxed text-secondary-foreground">
                {variable.description}
              </div>
            </div>
          )
        }}
      </For>
    </div>
  )
}
