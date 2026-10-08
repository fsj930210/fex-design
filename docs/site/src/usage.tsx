import { createSignal, createMemo, createEffect } from 'solid-js'
import type { Framework } from './types'
import { componentApis } from './data'
import { usageSnippets } from './usage-snippets'

export function Usage(props: {
  slug: string
  framework: Framework
  layer?: 'primitive' | 'ui'
  onLayerChange?: (layer: 'primitive' | 'ui') => void
}) {
  const [copiedImport, setCopiedImport] = createSignal(false)
  const [copiedSnippet, setCopiedSnippet] = createSignal(false)
  const [layer, setLayer] = createSignal<'ui' | 'primitive'>(props.layer ?? 'ui')

  createEffect(() => {
    if (props.layer) {
      setLayer(props.layer)
    }
  })

  const handleLayerChange = (newLayer: 'ui' | 'primitive') => {
    setLayer(newLayer)
    props.onLayerChange?.(newLayer)
  }

  const currentSnippet = createMemo(() => {
    const l = layer()
    const item = usageSnippets[props.slug]?.[l]
    if (item) return item

    const api = componentApis[props.slug]?.[l] ?? componentApis[props.slug]?.ui
    const name = api?.name ?? 'Component'
    return {
      import: `import { ${name} } from '@/components/${l}/${props.slug}'`,
      code: `<${name}>${name} 内容</${name}>`,
    }
  })

  const copyImport = () => {
    navigator.clipboard.writeText(currentSnippet().import)
    setCopiedImport(true)
    setTimeout(() => setCopiedImport(false), 2000)
  }

  const copyUsage = () => {
    navigator.clipboard.writeText(currentSnippet().code)
    setCopiedSnippet(true)
    setTimeout(() => setCopiedSnippet(false), 2000)
  }

  return (
    <section class="mt-8 mb-10 border-b border-border pb-10">
      <div class="mb-4">
        <h2 id="usage" class="text-xl font-bold tracking-tight text-foreground">使用方式</h2>
        <p class="mt-1 text-xs text-muted-foreground">
          安装完成后，在业务代码中导入组件并直接调用：
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div class="flex items-center gap-2">
          <span class="text-xs font-medium text-muted-foreground">组件形态:</span>
          <div class="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
            <button
              type="button"
              class={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                layer() === 'ui'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => handleLayerChange('ui')}
            >
              UI (开箱即用)
            </button>
            <button
              type="button"
              class={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                layer() === 'primitive'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => handleLayerChange('primitive')}
            >
              Primitive (解构拼装)
            </button>
          </div>
        </div>
        <span class="text-xs text-muted-foreground">
          {layer() === 'ui'
            ? '开箱即用高阶封装，内置完整场景样式与交互行为'
            : '包含默认基础样式（支持自由覆盖），解构为原子部件树便于深度定制'}
        </span>
      </div>

      <div class="space-y-4">
        {/* Step 1: Import */}
        <div class="overflow-hidden rounded-lg border border-border bg-[#18181b] text-white shadow-sm">
          <div class="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs">
            <span class="text-white/60 font-mono text-[11px]">1. 引入组件</span>
            <button
              type="button"
              class="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
              onClick={copyImport}
            >
              {copiedImport() ? '已复制' : '复制'}
            </button>
          </div>
          <div class="p-3 font-mono text-xs overflow-x-auto">
            <code>{currentSnippet().import}</code>
          </div>
        </div>

        {/* Step 2: Code Snippet */}
        <div class="overflow-hidden rounded-lg border border-border bg-[#18181b] text-white shadow-sm">
          <div class="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs">
            <span class="text-white/60 font-mono text-[11px]">2. 基础调用</span>
            <button
              type="button"
              class="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
              onClick={copyUsage}
            >
              {copiedSnippet() ? '已复制' : '复制'}
            </button>
          </div>
          <div class="p-3 font-mono text-xs overflow-x-auto">
            <pre class="leading-relaxed"><code>{currentSnippet().code}</code></pre>
          </div>
        </div>
      </div>
    </section>
  )
}
