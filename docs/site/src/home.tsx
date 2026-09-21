import { For, createSignal } from 'solid-js'
import { frameworks } from '@fex-design/docs-shared/model'
import type { Framework } from './types'

function SpotlightCard(props: {
  class?: string
  spotlightColor?: string
  children: any
}) {
  let cardRef: HTMLDivElement | undefined
  const [position, setPosition] = createSignal({ x: 0, y: 0 })
  const [opacity, setOpacity] = createSignal(0)

  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef) return
    const rect = cardRef.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      class={`group relative overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl dark:bg-[#111218] dark:border-white/[0.08] dark:hover:border-white/[0.2] ${props.class || ''}`}
    >
      <div
        class="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 ease-out"
        style={{
          opacity: opacity(),
          background: `radial-gradient(350px circle at ${position().x}px ${position().y}px, ${props.spotlightColor || 'rgba(99, 102, 241, 0.12)'}, transparent 80%)`,
        }}
      />
      <div class="relative z-10">{props.children}</div>
    </div>
  )
}

export function HomePage(props: {
  currentFramework: Framework
  onGoToComponents: (framework?: Framework, slug?: string) => void
}) {
  const frameworkBadges: Record<Framework, { name: string; desc: string; iconSrc: string }> = {
    react: { name: 'React', desc: 'React 19 Hooks & Suspense', iconSrc: '/frameworks/react.svg' },
    vue: { name: 'Vue', desc: 'Vue 3 Composition API & SFC', iconSrc: '/frameworks/vue.svg' },
    solid: { name: 'Solid', desc: 'Fine-grained Reactive Signals', iconSrc: '/frameworks/solid.svg' },
    svelte: { name: 'Svelte', desc: 'Svelte 5 Runes & Ultra Lean', iconSrc: '/frameworks/svelte.svg' },
    angular: { name: 'Angular', desc: 'Modern Signals & Standalone', iconSrc: '/frameworks/angular.svg' },
  }

  const pillars = [
    {
      title: '跨框架组件库体系',
      sub: 'Multi-Framework Component Suite',
      tag: 'Core System',
      badge: '五端对齐',
      spotlight: 'rgba(56, 189, 248, 0.2)',
      accent: 'text-sky-600 dark:text-sky-400 bg-sky-500/10 border-sky-500/20',
      desc: '一套共享 @fex-design/core 状态内核，完美覆盖 React、Vue、Solid、Svelte 与 Angular 五大主流生态。包含基础通用组件与面向深度业务场景的专用组件解决方案（如车牌输入、复杂表单联动、数据表格等）。',
    },
    {
      title: '现代化开发脚手架 CLI',
      sub: 'Developer Tooling & Automation',
      tag: 'CLI In Dev',
      badge: '即将发布',
      spotlight: 'rgba(168, 85, 247, 0.2)',
      accent: 'text-purple-600 dark:text-purple-400 bg-purple-500/10 border-purple-500/20',
      desc: '专为 Fex Design 打造的代码生成与工程脚手架。快速初始化五框架模板项目、交互式拉取源码级组件、同步最新 Design Tokens，赋予开发者类 shadcn 式的源码拥有感与自研掌控力。',
    },
    {
      title: '开箱即用中后台模板与应用矩阵',
      sub: 'Ready-to-use Admin & Solution Apps',
      tag: 'Apps Matrix',
      badge: '多框架覆盖',
      spotlight: 'rgba(16, 185, 129, 0.2)',
      accent: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      desc: '基于真实中后台深度打磨的现代管理系统模板矩阵（apps/*）。不仅覆盖各框架的企业级后台工程，后续还将持续沉淀可视化大屏底座、现代 AI 交互集成能力（如智能对话助手、流式消息与 Agent 协同套件）。',
    },
    {
      title: 'AI Native 深度友好设计',
      sub: 'Built for AI Coding Era',
      tag: 'AI Friendly',
      badge: 'AI 优先',
      spotlight: 'rgba(245, 158, 11, 0.2)',
      accent: 'text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20',
      desc: '代码架构拒绝过度抽象与隐式副作用，纯函数、确定性状态机、模块化单向数据流与标准 TypeScript 类型。极度契合 LLM / AI 辅助编程的认知与生成上下文，降低幻觉，生成即可直接跑通。',
    },
  ]

  const ecosystem = [
    {
      title: '通用实用工具库 @fex-design/utils',
      tag: 'HIGH PERFORMANCE',
      spotlight: 'rgba(245, 158, 11, 0.2)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      ),
      desc: '内置企业级高质量工具集合：开箱即用的统一 Fetch/Ajax 网络请求抽象、树结构高效遍历与打平、防抖节流、剪贴板、高性能数据变换工具，跨工程无缝复用。',
    },
    {
      title: '统一设计语言与 Tokens',
      tag: 'DESIGN SYSTEM',
      spotlight: 'rgba(244, 63, 94, 0.2)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
          <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
          <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
          <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
        </svg>
      ),
      desc: '跨框架共享一套规范化的 CSS 变量与设计规范。统一间距、圆角、字阶与状态反馈，支持轻量一键切换品牌主题，保证多技术栈应用在视觉与交互上百分百对齐。',
    },
    {
      title: '源码级交付，零品牌绑架',
      tag: 'ZERO LOCK-IN',
      spotlight: 'rgba(16, 185, 129, 0.2)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      desc: '组件统一采用干净规范的裸组件命名（Button, Dialog 等），没有强制性的私有品牌前缀。交付源码级架构，天然适合企业自研组件库孵化与深度二次定制。',
    },
    {
      title: '未来 AI 交互套件探索',
      tag: 'AI-NATIVE SUITE',
      spotlight: 'rgba(168, 85, 247, 0.2)',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="18" height="12" x="3" y="6" rx="2" />
          <path d="M9 14v1" /><path d="M15 14v1" />
          <path d="M8 2v2" /><path d="M16 2v2" />
          <path d="M2 10h2" /><path d="M20 10h2" />
        </svg>
      ),
      desc: '紧跟前沿 AI Native 交互变革，提供新一代对话流渲染、Prompt 智能填充、结构化数据流驱动等新一代交互范式，让企业应用自然跃迁至智能化时代。',
    },
  ]

  return (
    <div class="relative min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* 动态背景网格与渐变 */}
      <div class="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div class="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-[120px]" />

      {/* Hero Section */}
      <section class="relative mx-auto flex max-w-5xl flex-col items-center px-4 pt-20 pb-20 text-center sm:pt-28 sm:pb-24">
        {/* 状态 Pill */}
        <div class="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-muted-background px-4 py-1.5 text-xs font-medium text-foreground backdrop-blur-xl">
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
            <span class="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
          </span>
          <span>面向现代与 AI 时代的完整前端研发矩阵</span>
        </div>

        {/* 大标题 */}
        <h1 class="text-4xl font-black tracking-tight text-foreground sm:text-6xl lg:text-7xl">
          一套核心，驱动{' '}
          <span class="bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            五大现代框架
          </span>
        </h1>

        <p class="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Fex Design 致力于为前端团队与 AI 协作打造统一基座。以“跨端组件库 + 智能脚手架 CLI + 开箱即用中后台模板 + 企业级工具链”为核心，无缝赋能 React、Vue、Solid、Svelte 与 Angular。
        </p>

        {/* CTA 按钮区 */}
        <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            class="cursor-pointer inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-md transition-all duration-200 hover:opacity-90 active:scale-95"
            onClick={() => props.onGoToComponents(props.currentFramework, 'button')}
          >
            <span>浏览组件文档 →</span>
          </button>
          <a
            class="inline-flex items-center justify-center rounded-xl border border-border bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition-all duration-200 hover:bg-muted-background"
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
          >
            GitHub 仓库
          </a>
        </div>

        {/* Frameworks 导览矩阵 */}
        <div class="mt-16 w-full">
          <p class="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            支持并精心适配的现代前端技术栈
          </p>
          <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <For each={frameworks}>
              {(f) => {
                const info = frameworkBadges[f]
                return (
                  <button
                    class="group cursor-pointer flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md active:scale-98 dark:bg-[#111218] dark:border-white/[0.08] dark:hover:border-white/[0.2]"
                    onClick={() => props.onGoToComponents(f, 'button')}
                  >
                    <div class="h-9 w-9 mb-2 flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                      <img src={info.iconSrc} alt={info.name} class="h-8 w-8 object-contain" />
                    </div>
                    <span class="font-bold text-foreground">{info.name}</span>
                    <span class="text-[11px] text-muted-foreground mt-0.5">{info.desc}</span>
                  </button>
                )
              }}
            </For>
          </div>
        </div>
      </section>

      {/* Core Pillars Grid */}
      <section class="border-t border-border bg-secondary-background py-20 px-4 transition-colors duration-300 dark:bg-[#0c0d12]">
        <div class="mx-auto max-w-5xl">
          <div class="mb-14 text-center">
            <h2 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">构建现代企业级应用的四大核心支柱</h2>
            <p class="mt-3 text-sm text-muted-foreground">超越单一组件库范畴，覆盖从工程启动、界面拼装到业务场景落地的全链路</p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2">
            <For each={pillars}>
              {(pillar) => (
                <SpotlightCard spotlightColor={pillar.spotlight}>
                  <div class="flex items-center justify-between mb-4">
                    <span class={`rounded-md border px-2.5 py-0.5 text-xs font-bold ${pillar.accent}`}>
                      {pillar.tag}
                    </span>
                    <span class="rounded-md border border-border bg-muted-background px-2.5 py-0.5 text-[11px] font-medium text-foreground">
                      {pillar.badge}
                    </span>
                  </div>
                  <h3 class="text-xl font-extrabold text-foreground transition-colors">{pillar.title}</h3>
                  <p class="text-xs text-muted-foreground mb-3.5 font-mono">{pillar.sub}</p>
                  <p class="text-sm leading-relaxed text-foreground/80">{pillar.desc}</p>
                </SpotlightCard>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Ecosystem Section */}
      <section class="border-t border-border py-20 px-4 transition-colors duration-300">
        <div class="mx-auto max-w-5xl">
          <div class="mb-14 text-center">
            <h2 class="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">丰富生态与生产力工具</h2>
            <p class="mt-3 text-sm text-muted-foreground">从高频通用算法到下一代智能化应用，一应俱全</p>
          </div>

          <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <For each={ecosystem}>
              {(item) => (
                <SpotlightCard spotlightColor={item.spotlight}>
                  <div class="mb-4 flex items-center justify-between">
                    <div class="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted-background">
                      {item.icon}
                    </div>
                    <span class="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
                      {item.tag}
                    </span>
                  </div>
                  <h3 class="text-base font-bold text-foreground mb-2">{item.title}</h3>
                  <p class="text-xs leading-relaxed text-foreground/80">{item.desc}</p>
                </SpotlightCard>
              )}
            </For>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer class="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <p>© 2026 Fex Design. Released under the MIT License.</p>
      </footer>
    </div>
  )
}
