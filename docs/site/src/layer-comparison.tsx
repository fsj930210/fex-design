import { createSignal } from 'solid-js'
import type { Framework } from './types'

export function LayerComparison(props: { slug: string; framework: Framework }) {
  const [copiedLayer, setCopiedLayer] = createSignal<'ui' | 'primitive' | null>(null)

  const getSnippets = () => {
    switch (props.slug) {
      case 'anchor':
        return {
          ui: `<Anchor
  items={[
    { key: 'part-1', href: '#part-1', title: '快速上手' },
    { key: 'part-2', href: '#part-2', title: '进阶用法' },
  ]}
/>`,
          primitive: `<AnchorRoot>
  <AnchorRail>
    <AnchorIndicator />
  </AnchorRail>
  <AnchorList>
    <AnchorItem value="#part-1">
      <AnchorLink href="#part-1">快速上手</AnchorLink>
    </AnchorItem>
  </AnchorList>
</AnchorRoot>`,
        }
      case 'alert':
      default:
        return {
          ui: `<Alert
  type="success"
  title="支付成功"
  description="订单已生效，系统将尽快为您安排发货。"
  closable
/>`,
          primitive: `<Alert>
  <AlertIcon />
  <div class="flex-1">
    <AlertTitle>支付成功</AlertTitle>
    <AlertDescription>订单已生效，系统将尽快为您安排发货。</AlertDescription>
  </div>
  <AlertAction>
    <button onClick={handleDetail}>查看详情</button>
  </AlertAction>
</Alert>`,
        }
    }
  }

  const copyCode = async (layer: 'ui' | 'primitive') => {
    const code = getSnippets()[layer]
    await navigator.clipboard.writeText(code)
    setCopiedLayer(layer)
    setTimeout(() => setCopiedLayer(null), 1800)
  }

  return (
    <section class="my-8">
      <div class="mb-4">
        <h2 class="text-xl font-bold tracking-tight text-foreground">架构与调用对比</h2>
        
      </div>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* 左列：UI 层 */}
        <div class="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
          <div class="mb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                UI 层
              </span>
              <span class="text-xs font-medium text-muted-foreground">开箱即用 · 业务首选</span>
            </div>
            <button
              onClick={() => copyCode('ui')}
              class="flex items-center gap-1 rounded border border-border bg-muted-background px-2 py-1 text-xs text-secondary-foreground hover:bg-muted"
            >
              {copiedLayer() === 'ui' ? '已复制 ✓' : '复制代码'}
            </button>
          </div>

          <ul class="mb-3 space-y-1 text-xs text-secondary-foreground">
            <li class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-emerald-500"></span>
              高内聚单组件，一行配置声明即可运行
            </li>
            <li class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-emerald-500"></span>
              内置状态图标、关闭交互与语义化样式规范
            </li>
            <li class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-emerald-500"></span>
              适合 80% 的标准业务与后台界面场景
            </li>
          </ul>

          <div class="mt-auto overflow-hidden rounded-lg border border-border bg-muted-background">
            <div class="border-b border-border bg-muted/60 px-3 py-1.5 text-[11px] font-mono text-muted-foreground">
              配置式调用示例
            </div>
            <pre class="overflow-x-auto p-3 text-[12px] font-mono leading-relaxed text-foreground">
              <code>{getSnippets().ui}</code>
            </pre>
          </div>
        </div>

        {/* 右列：Primitive 层 */}
        <div class="flex flex-col rounded-xl border border-border bg-card p-4 shadow-sm">
          <div class="mb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="rounded-md bg-secondary/80 px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                Primitive 层
              </span>
              <span class="text-xs font-medium text-muted-foreground">解构部件 · 深度定制</span>
            </div>
            <button
              onClick={() => copyCode('primitive')}
              class="flex items-center gap-1 rounded border border-border bg-muted-background px-2 py-1 text-xs text-secondary-foreground hover:bg-muted"
            >
              {copiedLayer() === 'primitive' ? '已复制 ✓' : '复制代码'}
            </button>
          </div>

          <ul class="mb-3 space-y-1 text-xs text-secondary-foreground">
            <li class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-blue-500"></span>
              解构为原子部件树，完全掌控 DOM 层级与插槽
            </li>
            <li class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-blue-500"></span>
              仅提供核心状态逻辑与样式基建，不固化内部结构
            </li>
            <li class="flex items-center gap-1.5">
              <span class="size-1.5 rounded-full bg-blue-500"></span>
              适合 20% 的高度非标定制或企业级组件体系底层
            </li>
          </ul>

          <div class="mt-auto overflow-hidden rounded-lg border border-border bg-muted-background">
            <div class="border-b border-border bg-muted/60 px-3 py-1.5 text-[11px] font-mono text-muted-foreground">
              解构组装示例
            </div>
            <pre class="overflow-x-auto p-3 text-[12px] font-mono leading-relaxed text-foreground">
              <code>{getSnippets().primitive}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  )
}

