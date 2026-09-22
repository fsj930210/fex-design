import { For, Show, createMemo } from 'solid-js'
import { resolveComponentApi } from './component-api'
import type { ComponentApi, Framework } from './types'

export function ApiTable(props: { value: ComponentApi; framework: Framework }) {
  const value = createMemo(() => resolveComponentApi(props.value, props.framework))
  const hasCustomMembers = createMemo(
    () => value().props.length > 0 || value().events.length > 0 || value().slots.length > 0,
  )

  const inferNativeTag = (desc?: string) => {
    if (!desc) return 'HTML 元素'
    const match = desc.match(/继承原生\s*([a-zA-Z0-9]+)/)
    return match ? `<${match[1]}>` : 'HTML 元素'
  }

  return (
    <div class="mt-4 space-y-5">
      {/* 纯原生继承部件的规范呈现卡片 */}
      <Show when={!hasCustomMembers() && (!props.value.components || props.value.components.length === 0)}>
        <div class="rounded-xl border border-border bg-card p-3.5 shadow-sm">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="rounded bg-muted px-2 py-0.5 font-mono text-xs font-semibold text-secondary-foreground border border-border">
                {inferNativeTag(props.value.description)}
              </span>
              <span class="text-xs font-semibold text-foreground">原生 HTML 属性透传</span>
            </div>
            <span class="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              零额外 Props 负担
            </span>
          </div>
          <p class="mt-2 text-xs leading-relaxed text-secondary-foreground">
            该部件为纯样式化/语义化容器，完整继承底层原生 HTML 元素的全部属性与事件（包括 <code>class</code>、<code>style</code>、<code>ref</code>、<code>onClick</code> 及 ARIA 属性等），无额外自定义 Props。
          </p>
        </div>
      </Show>

      {/* 属性表格 */}
      <Show when={value().props.length > 0}>
        <section class="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div class="border-b border-border bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground">
            Props 属性
          </div>
          <div>
            <div class="grid grid-cols-[105px_1.2fr_70px_1.6fr] items-start gap-2.5 bg-muted-background px-3.5 py-2 text-[12px] font-semibold text-secondary-foreground max-[640px]:grid-cols-[90px_1fr] max-[640px]:[&>*:nth-child(n+3)]:hidden">
              <span>属性名</span>
              <span>类型</span>
              <span>默认值</span>
              <span>说明</span>
            </div>
            <For each={value().props}>
              {(property) => (
                <div class="grid grid-cols-[105px_1.2fr_70px_1.6fr] items-start gap-2.5 border-t border-border px-3.5 py-2.5 text-[12px] max-[640px]:grid-cols-[90px_1fr] max-[640px]:[&>*:nth-child(n+3)]:hidden hover:bg-muted/20">
                  <code class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-primary font-semibold text-[11.5px]">
                    {property.name}
                  </code>
                  <code class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-muted-foreground text-[11px]">
                    {property.type}
                  </code>
                  <code class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-muted-foreground text-[11px]">
                    {String(property.default ?? '—')}
                  </code>
                  <span class="text-secondary-foreground leading-relaxed text-[11.5px]">{property.description}</span>
                </div>
              )}
            </For>
          </div>
        </section>
      </Show>

      {/* 事件表格 */}
      <Show when={value().events.length > 0}>
        <section class="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div class="border-b border-border bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground">
            Events 事件
          </div>
          <div>
            <div class="grid grid-cols-[105px_1.2fr_1.6fr] items-start gap-2.5 bg-muted-background px-3.5 py-2 text-[12px] font-semibold text-secondary-foreground max-[640px]:grid-cols-[90px_1fr] max-[640px]:[&>*:nth-child(3)]:hidden">
              <span>事件名</span>
              <span>参数签名</span>
              <span>说明</span>
            </div>
            <For each={value().events}>
              {(event) => (
                <div class="grid grid-cols-[105px_1.2fr_1.6fr] items-start gap-2.5 border-t border-border px-3.5 py-2.5 text-[12px] max-[640px]:grid-cols-[90px_1fr] max-[640px]:[&>*:nth-child(3)]:hidden hover:bg-muted/20">
                  <code class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-primary font-semibold text-[11.5px]">
                    {event.name}
                  </code>
                  <code class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-muted-foreground text-[11px]">
                    {(event.parameters?.length ?? 0) > 0
                      ? event.parameters
                          .map((parameter) => `${parameter.name}: ${parameter.type}`)
                          .join(', ')
                      : '—'}
                  </code>
                  <span class="text-secondary-foreground leading-relaxed text-[11.5px]">{event.description}</span>
                </div>
              )}
            </For>
          </div>
        </section>
      </Show>

      {/* Slots 插槽表格 */}
      <Show when={value().slots.length > 0}>
        <section class="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
          <div class="border-b border-border bg-muted/40 px-3.5 py-2 text-xs font-semibold text-foreground">
            {value().slotLabel || 'Slots 插槽'}
          </div>
          <div>
            <div class="grid grid-cols-[105px_1fr] gap-2.5 bg-muted-background px-3.5 py-2 text-[12px] font-semibold text-secondary-foreground">
              <span>插槽名</span>
              <span>说明</span>
            </div>
            <For each={value().slots}>
              {(slot) => (
                <div class="grid grid-cols-[105px_1fr] gap-2.5 border-t border-border px-3.5 py-2.5 text-[12px] hover:bg-muted/20">
                  <code class="whitespace-pre-wrap break-words [overflow-wrap:anywhere] font-mono text-primary font-semibold text-[11.5px]">
                    {slot.name}
                  </code>
                  <span class="text-secondary-foreground leading-relaxed text-[11.5px]">{slot.description}</span>
                </div>
              )}
            </For>
          </div>
        </section>
      </Show>

      {/* 子组件部件遍历：多部件自然向下排列 */}
      <Show when={props.value.components?.length}>
        <div class="mt-6 space-y-4">
          <div class="flex items-center gap-2 pt-2">
            <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            <span class="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              复合子部件 (Subcomponents)
            </span>
          </div>
          <For each={props.value.components}>
            {(component) => {
              const id = apiAnchorId(component.layer, component.name)
              return (
                <section aria-labelledby={id} class="rounded-xl border border-emerald-500/20 bg-muted/10 p-3.5 shadow-sm">
                  <div class="flex items-center justify-between border-b border-border/70 pb-2.5">
                    <h4
                      id={id}
                      data-toc-item
                      data-toc-title={component.name}
                      class="scroll-mt-24 text-sm font-bold text-foreground font-mono"
                    >
                      {component.name}
                    </h4>
                    <span class="rounded border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Subcomponent
                    </span>
                  </div>
                  <Show when={component.description}>
                    <p class="mt-2 text-xs text-secondary-foreground leading-relaxed">
                      {component.description}
                    </p>
                  </Show>
                  <ApiTable value={component} framework={props.framework} />
                </section>
              )
            }}
          </For>
        </div>
      </Show>
    </div>
  )
}

function apiAnchorId(layer: ComponentApi['layer'], name: string) {
  return `api-${layer}-${name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`
}
