import { createResource, createSignal, Show } from 'solid-js'
import { getComponentFilePath, loadComponentSource } from './source-code-loader'
import type { Framework } from './types'

export function ManualInstall(props: { slug: string; framework: Framework }) {
  const [uiSource] = createResource(
    () => ({ framework: props.framework, layer: 'ui' as const, slug: props.slug }),
    ({ framework, layer, slug }) => loadComponentSource(framework, layer, slug),
  )

  const [primitiveSource] = createResource(
    () => ({ framework: props.framework, layer: 'primitive' as const, slug: props.slug }),
    ({ framework, layer, slug }) => loadComponentSource(framework, layer, slug),
  )

  const [copiedLayer, setCopiedLayer] = createSignal<'ui' | 'primitive' | 'css' | null>(null)
  const [showUiCode, setShowUiCode] = createSignal(false)
  const [showPrimitiveCode, setShowPrimitiveCode] = createSignal(false)

  const copyText = async (text: string, tag: 'ui' | 'primitive' | 'css') => {
    await navigator.clipboard.writeText(text)
    setCopiedLayer(tag)
    setTimeout(() => setCopiedLayer(null), 1800)
  }

  return (
    <section class="my-8">
      <div class="mb-4">
        <h2 class="text-xl font-bold tracking-tight text-foreground">手动安装与源码拷贝</h2>
        <p class="mt-1 text-sm text-secondary-foreground">
          本项目采用源码交付（Copy & Paste）。将组件源码直接拷贝至业务工程，完全掌控实现细节。
        </p>
      </div>

      <div class="space-y-4">
        {/* Step 1: 前置样式与依赖 */}
        <div class="rounded-xl border border-border bg-card p-4 shadow-sm">
          <div class="mb-2 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                1
              </span>
              <h3 class="text-sm font-semibold text-foreground">引入全局基础样式</h3>
            </div>
            <button
              onClick={() => copyText("import '@fex-design/styles'", 'css')}
              class="rounded border border-border bg-muted-background px-2 py-1 text-xs text-secondary-foreground hover:bg-muted"
            >
              {copiedLayer() === 'css' ? '已复制 ✓' : '复制样式引入'}
            </button>
          </div>
          <p class="text-xs text-secondary-foreground">
            在项目入口文件（如 <code>main.tsx</code> / <code>main.ts</code> / <code>app.vue</code>）中引入全局设计系统样式：
          </p>
          <div class="mt-2 overflow-x-auto rounded-lg border border-border bg-muted-background p-2.5 text-xs font-mono text-foreground">
            <code>import '@fex-design/styles'</code>
          </div>
        </div>

        {/* Step 2: 源码拷贝 (双列并排对比) */}
        <div>
          <div class="mb-3 flex items-center gap-2">
            <span class="flex size-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
              2
            </span>
            <h3 class="text-sm font-semibold text-foreground">拷贝组件源码 (选择对应层级)</h3>
          </div>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* 左列：UI 源码拷贝 */}
            <div class="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
              <div class="mb-2 flex items-center justify-between">
                <div>
                  <span class="rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                    UI 源码 (开箱即用)
                  </span>
                </div>
                <button
                  onClick={() => copyText(uiSource()?.code || '', 'ui')}
                  class="flex items-center gap-1 rounded border border-border bg-muted-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                >
                  {copiedLayer() === 'ui' ? '已复制源码 ✓' : '复制代码 (Copy)'}
                </button>
              </div>

              <div class="mb-3 text-xs text-secondary-foreground">
                建议保存到业务工程：
                <code class="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                  {getComponentFilePath(props.framework, 'ui', props.slug)}
                </code>
              </div>

              <div class="mt-auto">
                <button
                  onClick={() => setShowUiCode(!showUiCode())}
                  class="text-xs text-primary hover:underline"
                >
                  {showUiCode() ? '收起源码 ▲' : '查看完整源码 ▼'}
                </button>

                <Show when={showUiCode()}>
                  <div class="mt-2 max-h-72 overflow-y-auto rounded-lg border border-border bg-muted-background p-3 text-[11px] font-mono leading-relaxed text-foreground">
                    <pre><code>{uiSource()?.code}</code></pre>
                  </div>
                </Show>
              </div>
            </div>

            {/* 右列：Primitive 源码拷贝 */}
            <div class="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
              <div class="mb-2 flex items-center justify-between">
                <div>
                  <span class="rounded bg-secondary/80 px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                    Primitive 源码 (解构部件)
                  </span>
                </div>
                <button
                  onClick={() => copyText(primitiveSource()?.code || '', 'primitive')}
                  class="flex items-center gap-1 rounded border border-border bg-muted-background px-2.5 py-1 text-xs font-medium text-foreground hover:bg-muted"
                >
                  {copiedLayer() === 'primitive' ? '已复制源码 ✓' : '复制代码 (Copy)'}
                </button>
              </div>

              <div class="mb-3 text-xs text-secondary-foreground">
                建议保存到业务工程：
                <code class="ml-1 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
                  {getComponentFilePath(props.framework, 'primitive', props.slug)}
                </code>
              </div>

              <div class="mt-auto">
                <button
                  onClick={() => setShowPrimitiveCode(!showPrimitiveCode())}
                  class="text-xs text-primary hover:underline"
                >
                  {showPrimitiveCode() ? '收起源码 ▲' : '查看完整源码 ▼'}
                </button>

                <Show when={showPrimitiveCode()}>
                  <div class="mt-2 max-h-72 overflow-y-auto rounded-lg border border-border bg-muted-background p-3 text-[11px] font-mono leading-relaxed text-foreground">
                    <pre><code>{primitiveSource()?.code}</code></pre>
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
