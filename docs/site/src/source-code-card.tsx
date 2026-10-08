import { createSignal, Show } from 'solid-js'

export function SourceCodeCard(props: {
  layer: 'ui' | 'primitive'
  slug: string
  ext: string
  source: string
}) {
  const [copied, setCopied] = createSignal(false)
  const [expanded, setExpanded] = createSignal(false)

  const copy = () => {
    navigator.clipboard.writeText(props.source)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isUi = () => props.layer === 'ui'

  return (
    <div class="overflow-hidden rounded-lg border border-border bg-card shadow-sm flex flex-col">
      <div class="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2 text-xs">
        <div class="flex items-center gap-1.5 font-mono text-foreground font-medium truncate">
          <span
            class={`rounded px-1 py-0.2 text-[10px] uppercase font-bold ${
              isUi()
                ? 'bg-primary/10 text-primary'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            }`}
          >
            {props.ext}
          </span>
          <span class="truncate">components/{props.layer}/{props.slug}.{props.ext}</span>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            onClick={() => setExpanded(!expanded())}
          >
            {expanded() ? '折叠' : '展开'}
          </button>
          <button
            type="button"
            class="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground hover:bg-muted cursor-pointer transition-colors"
            onClick={copy}
          >
            {copied() ? '已复制' : '复制'}
          </button>
        </div>
      </div>
      <div
        class={`relative bg-[#18181b] text-white p-3 font-mono text-xs overflow-x-auto transition-all ${
          expanded() ? 'max-h-[500px] overflow-y-auto' : 'max-h-36 overflow-hidden'
        }`}
      >
        <pre class="leading-relaxed">
          <code>{props.source || '// 源码加载中...'}</code>
        </pre>
        <Show when={!expanded()}>
          <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#18181b] to-transparent pointer-events-none flex items-end justify-center pb-1">
            <span class="text-[11px] text-white/40">点击展开完整源码</span>
          </div>
        </Show>
      </div>
    </div>
  )
}
