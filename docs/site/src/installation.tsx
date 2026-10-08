import { createSignal, createMemo, createEffect, Show } from 'solid-js'
import type { Framework } from './types'
import { loadComponentSource } from './source-code-loader'
import { SourceCodeCard } from './source-code-card'

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

export function Installation(props: {
  slug: string
  framework: Framework
  layer?: 'primitive' | 'ui'
  onLayerChange?: (layer: 'primitive' | 'ui') => void
}) {
  const [tab, setTab] = createSignal<'command' | 'manual'>('command')
  const [pm, setPm] = createSignal<PackageManager>('pnpm')
  const [copiedDep, setCopiedDep] = createSignal(false)

  const [uiSource, setUiSource] = createSignal<string>('')
  const [primitiveSource, setPrimitiveSource] = createSignal<string>('')
  const [cmdLayer, setCmdLayer] = createSignal<'ui' | 'primitive'>(props.layer ?? 'ui')
  const [copiedCli, setCopiedCli] = createSignal(false)

  createEffect(() => {
    if (props.layer) {
      setCmdLayer(props.layer)
    }
  })

  const handleLayerChange = (newLayer: 'ui' | 'primitive') => {
    setCmdLayer(newLayer)
    props.onLayerChange?.(newLayer)
  }

  const compTarget = createMemo(() => {
    return cmdLayer() === 'primitive' ? `primitive/${props.slug}` : props.slug
  })

  const cliCommand = createMemo(() => {
    const target = compTarget()
    switch (pm()) {
      case 'npm': return `npx @fex-design/cli add ${target}`
      case 'yarn': return `yarn dlx @fex-design/cli add ${target}`
      case 'bun': return `bunx @fex-design/cli add ${target}`
      default: return `pnpm dlx @fex-design/cli add ${target}`
    }
  })

  const localCommand = createMemo(() => {
    const target = compTarget()
    switch (pm()) {
      case 'npm': return `npm run fex add ${target}`
      case 'yarn': return `yarn fex add ${target}`
      case 'bun': return `bun run fex add ${target}`
      default: return `pnpm fex add ${target}`
    }
  })

  const copyCli = () => {
    navigator.clipboard.writeText(cliCommand())
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 2000)
  }

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

  return (
    <section class="mt-8 mb-10 border-b border-border pb-10">
      <div class="mb-4">
        <h2 id="installation" class="text-xl font-bold tracking-tight text-foreground">安装</h2>
        <div class="mt-3 flex items-center gap-6 border-b border-border text-sm">
          <button
            type="button"
            class={`pb-2.5 font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
              tab() === 'command'
                ? 'border-primary text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setTab('command')}
          >
            CLI 命令
          </button>
          <button
            type="button"
            class={`pb-2.5 font-medium transition-colors border-b-2 -mb-px cursor-pointer ${
              tab() === 'manual'
                ? 'border-primary text-foreground font-semibold'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setTab('manual')}
          >
            手动安装
          </button>
        </div>
      </div>

      <Show when={tab() === 'command'}>
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-2">
              <span class="text-xs font-medium text-muted-foreground">组件形态:</span>
              <div class="flex items-center gap-1 rounded-lg border border-border bg-muted/40 p-1">
                <button
                  type="button"
                  class={`rounded-md px-2.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                    cmdLayer() === 'ui'
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
                    cmdLayer() === 'primitive'
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
              {cmdLayer() === 'ui'
                ? '开箱即用高阶封装，内置完整场景样式，自动级联 Primitive 与依赖'
                : '包含默认基础样式（支持自由覆盖），解构为原子部件树便于深度定制'}
            </span>
          </div>

          <div class="overflow-hidden rounded-lg border border-border bg-[#18181b] text-white shadow-sm">
            <div class="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs">
              <div class="flex items-center gap-2">
                <span class="text-white/40 font-mono text-[11px]">&gt;_</span>
                <div class="flex items-center gap-1 rounded bg-white/5 p-0.5">
                  {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((name) => (
                    <button
                      type="button"
                      class={`rounded px-2 py-0.5 font-mono text-[11px] transition-colors cursor-pointer ${
                        pm() === name
                          ? 'bg-white/20 text-white font-semibold'
                          : 'text-white/60 hover:text-white'
                      }`}
                      onClick={() => setPm(name)}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                class="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-white/80 hover:bg-white/10 hover:text-white cursor-pointer transition-colors"
                onClick={copyCli}
              >
                {copiedCli() ? '已复制' : '复制'}
              </button>
            </div>
            <div class="p-3 font-mono text-xs overflow-x-auto">
              <code>{cliCommand()}</code>
            </div>
          </div>

          <div class="flex items-center text-xs text-muted-foreground">
            <span>
              💡 若当前项目已执行过 <code class="font-mono text-foreground">init</code> 初始化，亦可直接使用工程快捷命令：
              <code class="font-mono text-foreground font-semibold ml-1">{localCommand()}</code>
            </span>
          </div>
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
              安装所需依赖：
            </h3>
            <div class="overflow-hidden rounded-lg border border-border bg-[#18181b] text-white">
              <div class="flex items-center justify-between border-b border-white/10 px-3 py-2 text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-white/40 font-mono text-[11px]">&gt;_</span>
                  <div class="flex items-center gap-1 rounded bg-white/5 p-0.5">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as const).map((name) => (
                      <button
                        type="button"
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
                  type="button"
                  class="cursor-pointer text-white/60 hover:text-white flex items-center gap-1 text-[11px]"
                  onClick={copyDep}
                >
                  <Show when={copiedDep()} fallback={<span>复制</span>}>
                    <span class="text-emerald-400">已复制</span>
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
              复制源码并粘贴至你的项目中：
            </h3>
            <p class="text-xs text-muted-foreground mb-3">
              根据您的需求选择拷贝 UI 层（开箱即用）或 Primitive 层（解构拼装）：
            </p>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SourceCodeCard
                layer="ui"
                slug={props.slug}
                ext={ext()}
                source={uiSource()}
              />
              <SourceCodeCard
                layer="primitive"
                slug={props.slug}
                ext={ext()}
                source={primitiveSource()}
              />
            </div>
          </div>

          {/* Step 3 */}
          <div class="relative pl-8">
            <div class="absolute left-0 top-0 flex size-6 items-center justify-center rounded-full border border-border bg-muted text-xs font-semibold text-foreground">
              3
            </div>
            <h3 class="text-sm font-medium text-foreground mb-1">
              根据项目配置调整导入路径
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
