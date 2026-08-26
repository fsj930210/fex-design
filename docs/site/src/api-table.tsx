import { For } from 'solid-js'
import type { ComponentApi, Framework } from './types'

const nodeTypes: Record<Framework, string> = {
  react: 'ReactNode',
  vue: 'VNodeChild',
  solid: 'JSX.Element',
  svelte: 'Snippet',
  angular: 'Node (content projection)',
}
export function ApiTable(props: { value: ComponentApi; framework: Framework }) {
  return (
    <div class="mt-5 overflow-hidden rounded-lg border border-border">
      <div class="grid grid-cols-[120px_1.4fr_90px_2fr] items-start gap-3.5 bg-muted-background px-4 py-3.25 text-[13px] font-semibold text-secondary-foreground max-[720px]:grid-cols-[90px_1fr] max-[720px]:[&>:nth-child(n+3)]:hidden">
        <span>属性</span>
        <span>类型</span>
        <span>默认值</span>
        <span>说明</span>
      </div>
      <For each={props.value.props}>
        {(property) => (
          <div class="grid grid-cols-[120px_1.4fr_90px_2fr] items-start gap-3.5 border-t border-border px-4 py-3.25 text-[13px] max-[720px]:grid-cols-[90px_1fr] max-[720px]:[&>:nth-child(n+3)]:hidden">
            <code class="whitespace-pre-wrap text-primary">{property.name}</code>
            <code class="whitespace-pre-wrap text-primary">
              {property.type.replaceAll('FrameworkNode', nodeTypes[props.framework])}
            </code>
            <code class="whitespace-pre-wrap text-primary">{String(property.default ?? '—')}</code>
            <span>{property.description}</span>
          </div>
        )}
      </For>
    </div>
  )
}
