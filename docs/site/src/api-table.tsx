import { For } from 'solid-js'
import { Show } from 'solid-js'
import { resolveComponentApi } from './component-api'
import type { ComponentApi, Framework } from './types'

export function ApiTable(props: { value: ComponentApi; framework: Framework }) {
  const value = () => resolveComponentApi(props.value, props.framework)
  return (
    <div class="mt-5 space-y-8">
      <Show when={props.value.components?.length}>
        <For each={props.value.components}>
          {(component) => {
            const id = apiAnchorId(component.layer, component.name)
            return (
              <section aria-labelledby={id}>
                <h3
                  id={id}
                  data-toc-item
                  data-toc-title={component.name}
                  class="scroll-mt-24 mb-2 text-base font-semibold"
                >
                  {component.name}
                </h3>
                <p class="mb-4 leading-relaxed text-foreground">{component.description}</p>
                <ApiTable value={component} framework={props.framework} />
              </section>
            )
          }}
        </For>
      </Show>
      <Show when={value().props.length > 0}>
        <section>
          <h4 class="mb-2 text-sm font-semibold">属性</h4>
          <div class="overflow-hidden rounded-lg border border-border">
            <div class="grid grid-cols-[120px_1.4fr_90px_2fr] items-start gap-3.5 bg-muted-background px-4 py-3.25 text-[13px] font-semibold text-secondary-foreground max-[720px]:grid-cols-[90px_1fr] max-[720px]:[&>:nth-child(n+3)]:hidden">
              <span>属性</span>
              <span>类型</span>
              <span>默认值</span>
              <span>说明</span>
            </div>
            <For each={value().props}>
              {(property) => (
                <div class="grid grid-cols-[120px_1.4fr_90px_2fr] items-start gap-3.5 border-t border-border px-4 py-3.25 text-[13px] max-[720px]:grid-cols-[90px_1fr] max-[720px]:[&>:nth-child(n+3)]:hidden">
                  <code class="whitespace-pre-wrap text-primary">{property.name}</code>
                  <code class="whitespace-pre-wrap text-primary">{property.type}</code>
                  <code class="whitespace-pre-wrap text-primary">
                    {String(property.default ?? '—')}
                  </code>
                  <span>{property.description}</span>
                </div>
              )}
            </For>
          </div>
        </section>
      </Show>
      <Show when={value().slots.length > 0}>
        <section>
          <h4 class="mb-2 text-sm font-semibold">{value().slotLabel}</h4>
          <div class="overflow-hidden rounded-lg border border-border">
            <div class="grid grid-cols-[120px_1fr] gap-3.5 bg-muted-background px-4 py-3.25 text-[13px] font-semibold text-secondary-foreground">
              <span>名称</span>
              <span>说明</span>
            </div>
            <For each={value().slots}>
              {(slot) => (
                <div class="grid grid-cols-[120px_1fr] gap-3.5 border-t border-border px-4 py-3.25 text-[13px]">
                  <code class="whitespace-pre-wrap text-primary">{slot.name}</code>
                  <span>{slot.description}</span>
                </div>
              )}
            </For>
          </div>
        </section>
      </Show>
    </div>
  )
}

function apiAnchorId(layer: ComponentApi['layer'], name: string) {
  return `api-${layer}-${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`
}
