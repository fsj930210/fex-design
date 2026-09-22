import { createSignal, createMemo, createEffect, Show, For } from 'solid-js'
import type { Framework } from './types'
import { loadComponentSource } from './source-code-loader'

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

export function Installation(props: { slug: string; framework: Framework }) {
  const [tab, setTab] = createSignal<'command' | 'manual'>('manual')
  const [pm, setPm] = createSignal<PackageManager>('pnpm')
  const [copiedDep, setCopiedDep] = createSignal(false)

  const [uiSource, setUiSource] = createSignal<string>('')
  const [primitiveSource, setPrimitiveSource] = createSignal<string>('')
  const [copiedUi, setCopiedUi] = createSignal(false)
  const [copiedPrimitive, setCopiedPrimitive] = createSignal(false)
  const [expandUi, setExpandUi] = createSignal(false)
  const [expandPrimitive, setExpandPrimitive] = createSignal(false)

  createEffect(async () => {
    const [uiCode, primCode] = await Promise.all([
      loadComponentSource(props.framework, 'ui', props.slug),
      loadComponentSource(props.framework, 'primitive', props.slug),
    ])
    setUiSource(uiCode)
    setPrimitiveSource(primCode)
  })

  const ext = createMemo(() => {
    switch (props.framework) {
      case 'vue': return 'vue'
      case 'svelte': return 'svelte'
      case 'angular': return 'ts'
      default: return 'tsx'
    }
  })

  const depCommand = createMemo(() => {
    const pkg = '@fex-design/styles clsx tailwind-merge'
    switch (pm()) {
      case 'npm': return `npm install ${pkg}`
      case 'yarn': return `yarn add ${pkg}`
      case 'bun': return `bun add ${pkg}`
      default: return `pnpm add ${pkg}`
    }
  })

  const copyDep = () => {
    navigator.clipboard.writeText(depCommand())
    setCopiedDep(true)
    setTimeout(() => setCopiedDep(false), 2000)
  }

  const copyUi = () => {
    navigator.clipboard.writeText(uiSource())
    setCopiedUi(true)
    setTimeout(() => setCopiedUi(false), 2000)
  }

  const copyPrimitive = () => {
    navigator.clipboard.writeText(primitiveSource())
    setCopiedPrimitive(true)
    setTimeout(() => setCopiedPrimitive(false), 2000)
  }

  return (
    <section class="mt-8 mb-10 border-b border-border pb-10">
      <div class="mb-4">
        <h2 class="text-xl font-bold tracking-tight text-foreground">Installation</h2>
        <div class="mt-3 flex items-center gap-6 border-b border-border text-sm">
          <button
            class={`pb-2.5 font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
              tab() === 'command'
                ? 'border-primary text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setTab('command')}
          >
            Command
          </button>
          <button
            class={`pb-2.5 font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
              tab() === 'manual'
                ? 'border-primary text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setTab('manual')}
          >
            Manual
          </button>
        </div>
      </div>

      <Show when={tab() === 'command'}>
        <div class="rounded-xl border border-dashed border-border bg-muted/30 p-8 text-center">
          <div class="mx-auto flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground mb-3">
            <svg class="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="4 17 10 11 4 5" />
              <line x1="12" y1="19" x2="20" y2="19" />
            </svg>
          </div>
          <div class="text-sm font-semibold text-foreground">CLI 命令方式还在开发中</div>
          <div class="mt-1 text-xs text-muted-foreground">敬请期待！当前阶段请通过 Manual 模式复制源码到项目中使用。</div>
        </div>
      </Show>

      <Show when={tab() === 'manual'}>
        <div class="space-y-8">
          {/* Step 1 */}
          <div class="relative pl-8">
            <div class="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-foreground">
              1
            </div>
            <h3 class="text-sm font-medium text-foreground mb-3">
              Install the following dependencies:
            </h3>
            <div class="overflow-hidden rounded-lg border border-border bg-[#18181b] text-white">
              <div class="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-white/40 font-mono text-[11px]">&gt;_</span>
                  <div class="flex items-center gap-1 rounded bg-white/5 p-0.5">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((name) => (
                      <button
                        class={`rounded px-2 py-0.5 text-[11px] transition-colors cursor-pointer ${
                          pm() === name ? 'bg-white/20 text-white font-medium' : 'text-white/60 hover:text-white'
                        }`}
                        onClick={() => setPm(name)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  class="cursor-pointer text-white/60 hover:text-white flex items-center gap-1 text-[11px]"
                  onClick={copyDep}
                >
                  <Show when={copiedDep()} fallback={<span>Copy</span>}>
                    <span class="text-emerald-400">Copied!</span>
                  </Show>
                </button>
              </div>
              <div class="p-3 font-mono text-xs text-emerald-300">
                {depCommand()}
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div class="relative pl-8">
            <div class="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-foreground">
              2
            </div>
            <h3 class="text-sm font-medium text-foreground mb-2">
              Copy and paste the following code into your project.
            </h3>
            <p class="text-xs text-muted-foreground mb-3">
              根据您的需求选择拷贝 UI 层（开箱即用）或 Primitive 层（解构拼装）：
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* UI Source Card */}
              <div class="overflow-hidden rounded-lg border border-border bg-card shadow-sm flex flex-col">
                <div class="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2 text-xs">
                  <div class="flex items-center gap-1.5 font-mono text-foreground font-medium truncate">
                    <span class="rounded bg-primary/10 px-1 py-0.2 text-[10px] text-primary uppercase font-bold">
                      {ext()}
                    </span>
                    <span class="truncate">components/ui/{props.slug}.{ext()}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      class="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => setExpandUi(!expandUi())}
                    >
                      {expandUi() ? 'Collapse' : 'Expand'}
                    </button>
                    <button
                      class="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground hover:bg-muted cursor-pointer"
                      onClick={copyUi}
                    >
                      {copiedUi() ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div
                  class={`relative bg-[#18181b] text-white p-3 font-mono text-xs overflow-x-auto transition-all ${
                    expandUi() ? 'max-h-[500px] overflow-y-auto' : 'max-h-36 overflow-hidden'
                  }`}
                >
                  <pre class="leading-relaxed">
                    <code>{uiSource() || '// 源码加载中...'}</code>
                  </pre>
                  <Show when={!expandUi()}>
                    <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#18181b] to-transparent pointer-events-none flex items-end justify-center pb-1">
                      <span class="text-[11px] text-white/40">点击 Expand 展开完整源码</span>
                    </div>
                  </Show>
                </div>
              </div>

              {/* Primitive Source Card */}
              <div class="overflow-hidden rounded-lg border border-border bg-card shadow-sm flex flex-col">
                <div class="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2 text-xs">
                  <div class="flex items-center gap-1.5 font-mono text-foreground font-medium truncate">
                    <span class="rounded bg-emerald-500/10 px-1 py-0.2 text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold">
                      {ext()}
                    </span>
                    <span class="truncate">components/primitive/{props.slug}.{ext()}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <button
                      class="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => setExpandPrimitive(!expandPrimitive())}
                    >
                      {expandPrimitive() ? 'Collapse' : 'Expand'}
                    </button>
                    <button
                      class="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium text-foreground hover:bg-muted cursor-pointer"
                      onClick={copyPrimitive}
                    >
                      {copiedPrimitive() ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div
                  class={`relative bg-[#18181b] text-white p-3 font-mono text-xs overflow-x-auto transition-all ${
                    expandPrimitive() ? 'max-h-[500px] overflow-y-auto' : 'max-h-36 overflow-hidden'
                  }`}
                >
                  <pre class="leading-relaxed">
                    <code>{primitiveSource() || '// 源码加载中...'}</code>
                  </pre>
                  <Show when={!expandPrimitive()}>
                    <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#18181b] to-transparent pointer-events-none flex items-end justify-center pb-1">
                      <span class="text-[11px] text-white/40">点击 Expand 展开完整源码</span>
                    </div>
                  </Show>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div class="relative pl-8">
            <div class="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-foreground">
              3
            </div>
            <h3 class="text-sm font-medium text-foreground mb-1">
              Update the import paths to match your project setup.
            </h3>
            <p class="text-xs text-muted-foreground">
              将组件内部引入的基础样式或工具（如 <code class="font-mono text-foreground">@fex-design/styles</code> 或 <code class="font-mono text-foreground">cn</code>）替换为您项目中配置的实际路径即可。
            </p>
          </div>
        </div>
      </Show>
    </section>
  )
}
