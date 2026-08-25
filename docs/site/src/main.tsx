import { render } from 'solid-js/web'
import {
  createEffect,
  createMemo,
  createResource,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from 'solid-js'
import { Anchor } from '@fex-design/solid/primitive/anchor'
import type { AnchorItem } from '@fex-design/solid/primitive/anchor'
import { frameworks } from '@fex-design/docs-shared/model'
import { PREVIEW_PROTOCOL } from '@fex-design/docs-shared/preview-protocol'
import { buttonExamples } from '@fex-design/docs-shared/button-manifest'
import type { ApiProperty, ApiValue, ComponentApi, Framework, PreviewRuntimeMessage } from './types'
import buttonApi from '../../api/ui/button.json'
import primitiveButtonApi from '../../api/primitive/button.json'
import '@fex/styles'
import './site.css'

const pathParts = window.location.pathname.split('/').filter(Boolean)
const pathFramework = pathParts[0] as Framework
const initialFramework = frameworks.includes(pathFramework) ? pathFramework : 'solid'
const initialSlug = pathParts[2] ?? 'button'
const button = buttonApi as ComponentApi
const primitiveButton = primitiveButtonApi as ComponentApi
const previewOrigins: Record<Framework, string> = {
  angular: 'http://127.0.0.1:4110',
  react: 'http://127.0.0.1:4111',
  solid: 'http://127.0.0.1:4112',
  svelte: 'http://127.0.0.1:4113',
  vue: 'http://127.0.0.1:4114',
}
const primitiveButtonComposition = `Button
└── ButtonIcon (optional)

ButtonGroup
├── Button
│   └── ButtonIcon (optional)
└── Button`
const uiButtonComposition = `Button

ButtonGroup
├── Button
└── Button`
const componentSlugs = [
  'alert',
  'anchor',
  'aspect-ratio',
  'auto-complete',
  'avatar',
  'badge',
  'button',
  'calendar',
  'card',
  'carousel',
  'cascader',
  'checkbox',
  'collapse',
  'color-picker',
  'context-menu',
  'data-table',
  'date-picker',
  'dialog',
  'drawer',
  'empty',
  'field',
  'form',
  'input',
  'input-number',
  'input-otp',
  'listbox',
  'masonry',
  'menu',
  'message',
  'pagination',
  'popover',
  'progress',
  'qrcode',
  'radio',
  'rate',
  'select',
  'separator',
  'skeleton',
  'slider',
  'sortable',
  'steps',
  'switch',
  'table',
  'tabs',
  'tag',
  'textarea',
  'time-picker',
  'timeline',
  'toast',
  'toggle',
  'tooltip',
  'tour',
  'transfer',
  'tree',
  'tree-select',
  'upload',
  'watermark',
]
function titleFromSlug(slug: string) {
  return slug
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function DemoCard(props: {
  scene: { id: string; title: string; description: string }
  framework: Framework
  layer: 'primitive' | 'ui'
  slug: string
}) {
  const [tab, setTab] = createSignal<'preview' | 'code'>('preview')
  const [cardLayer, setCardLayer] = createSignal<'primitive' | 'ui'>(props.layer)
  const [copied, setCopied] = createSignal(false)
  const [frameHeight, setFrameHeight] = createSignal(180)
  const [frameReady, setFrameReady] = createSignal(false)
  let previewFrame!: HTMLIFrameElement
  const [source] = createResource(
    () => `${props.framework}:${cardLayer()}:${props.slug}:${props.scene.id}`,
    async () =>
      (
        await fetch(
          `/__example-source?framework=${props.framework}&layer=${cardLayer()}&component=${props.slug}&example=${props.scene.id}`,
        )
      ).json() as Promise<{ source: string; html: string }>,
  )
  const url = () =>
    `${previewOrigins[props.framework]}/examples/${props.framework}/${cardLayer()}/${props.slug}/${props.scene.id}?embed=true`
  // iframe URL 是外部 Preview Runtime 边界；URL 变化后等待 runtime 的 ready 消息再展示内容。
  createEffect(() => {
    url()
    setFrameReady(false)
  })
  const copySource = async () => {
    if (!source()) return
    await navigator.clipboard.writeText(source()!.source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }
  onMount(() => {
    const receivePreviewMessage = (event: MessageEvent<PreviewRuntimeMessage>) => {
      if (event.source !== previewFrame?.contentWindow) return
      if (event.data?.protocol !== PREVIEW_PROTOCOL) return
      if (event.data.type === 'ready') setFrameReady(true)
      if (event.data.type === 'resize') setFrameHeight(Math.max(140, Math.ceil(event.data.height)))
    }
    addEventListener('message', receivePreviewMessage)
    onCleanup(() => removeEventListener('message', receivePreviewMessage))
  })
  const copyIcon = () =>
    copied() ? (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="m5 12 4 4L19 6" />
      </svg>
    ) : (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="9" y="9" width="11" height="11" rx="2" />
        <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
      </svg>
    )
  return (
    <article class="example" id={`example-${props.scene.id}`}>
      <div class="example-heading">
        <div>
          <h3>{props.scene.title}</h3>
          <p>{props.scene.description}</p>
        </div>
      </div>
      <div class="example-card">
        <div class="example-tabs">
          <div class="example-view-tabs">
            <button data-active={tab() === 'preview'} onClick={() => setTab('preview')}>
              预览
            </button>
            <button data-active={tab() === 'code'} onClick={() => setTab('code')}>
              源码
            </button>
          </div>
          <div class="example-layer-tabs" aria-label="示例层级">
            <button
              data-active={cardLayer() === 'primitive'}
              onClick={() => {
                setFrameHeight(180)
                setCardLayer('primitive')
              }}
            >
              Primitive
            </button>
            <button
              data-active={cardLayer() === 'ui'}
              onClick={() => {
                setFrameHeight(180)
                setCardLayer('ui')
              }}
            >
              UI
            </button>
          </div>
          <div class="example-actions">
            <Show when={tab() === 'code'}>
              <button
                class="icon-button"
                title={copied() ? '已复制' : '复制源码'}
                aria-label={copied() ? '已复制' : '复制源码'}
                onClick={() => void copySource()}
              >
                {copyIcon()}
              </button>
            </Show>
            <a
              class="icon-button"
              href={url().replace('?embed=true', '')}
              target="_blank"
              rel="noreferrer"
              title="新窗口打开"
              aria-label="新窗口打开"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 5h5v5M10 14 19 5" />
                <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
              </svg>
            </a>
          </div>
        </div>
        <Show
          when={tab() === 'preview'}
          fallback={
            <div
              class="example-code"
              innerHTML={source.loading ? '<pre>正在读取源码…</pre>' : (source()?.html ?? '')}
            />
          }
        >
          <div class="example-preview" style={{ height: `${frameHeight()}px` }}>
            <Show when={!frameReady()}>
              <div class="preview-loading" role="status" aria-label="正在加载预览">
                <span class="preview-loading-spinner" aria-hidden="true" />
              </div>
            </Show>
            <iframe
              ref={(element) => {
                previewFrame = element
              }}
              classList={{ 'is-ready': frameReady() }}
              title={`${props.framework} ${cardLayer()} ${props.slug} ${props.scene.id}`}
              src={url()}
              scrolling="no"
            />
          </div>
        </Show>
      </div>
    </article>
  )
}

const frameworkNodeTypes: Record<Framework, string> = {
  react: 'ReactNode',
  vue: 'VNodeChild',
  solid: 'JSX.Element',
  svelte: 'Snippet',
  angular: 'Node (content projection)',
}

function resolveApiType(type: string, framework: Framework) {
  return type.replaceAll('FrameworkNode', frameworkNodeTypes[framework])
}

function ApiTable(props: { value: ComponentApi; framework: Framework }) {
  return (
    <div class="table">
      <div class="tr head">
        <span>属性</span>
        <span>类型</span>
        <span>默认值</span>
        <span>说明</span>
      </div>
      <For each={props.value.props}>
        {(property) => (
          <div class="tr">
            <code>{property.name}</code>
            <code>{resolveApiType(property.type, props.framework)}</code>
            <code>{String(property.default ?? '—')}</code>
            <span>{property.description}</span>
          </div>
        )}
      </For>
    </div>
  )
}

function App() {
  const anchorOffset = 88
  const [framework, setFramework] = createSignal<Framework>(initialFramework)
  const [slug, setSlug] = createSignal(initialSlug)
  const [layer] = createSignal<'primitive' | 'ui'>(
    (new URLSearchParams(location.search).get('layer') as 'primitive' | 'ui') ?? 'ui',
  )
  const [showCode, setShowCode] = createSignal(true)
  const [activeProps, setActiveProps] = createSignal<Record<string, ApiValue>>({})
  const [events, setEvents] = createSignal<unknown[]>([])
  const [previewHeight, setPreviewHeight] = createSignal(180)
  let iframe!: HTMLIFrameElement
  const api = () =>
    slug() === 'button' ? (layer() === 'primitive' ? primitiveButton : button) : undefined
  const title = () => api()?.name ?? titleFromSlug(slug())
  const tocItems = createMemo<readonly AnchorItem<string>[]>(() => [
    { key: 'overview', title: 'Primitive 与 UI', target: '#overview' },
    { key: 'composition', title: 'Composition', target: '#composition' },
    ...(layer() === 'primitive'
      ? [{ key: 'primitive-guide', title: 'Primitive 能力', target: '#primitive-guide' }]
      : []),
    {
      key: 'examples',
      title: '示例',
      target: '#examples',
      children: (slug() === 'button' ? buttonExamples[layer()] : []).map((scene) => ({
        key: `example-${scene.id}`,
        title: scene.title,
        target: `#example-${scene.id}`,
      })),
    },
    { key: 'api', title: 'API', target: '#api' },
  ])
  const previewUrl = (embed = true) =>
    `${previewOrigins[framework()]}/examples/${framework()}/${slug()}/basic${embed ? '?embed=true' : ''}`
  const pushProps = () =>
    iframe?.contentWindow?.postMessage(
      { protocol: PREVIEW_PROTOCOL, type: 'render', props: activeProps() },
      '*',
    )
  const updateProp = (property: ApiProperty, value: ApiValue) => {
    setActiveProps((current) => ({ ...current, [property.name]: value }))
    queueMicrotask(pushProps)
  }
  const selectFramework = (next: Framework) => {
    setFramework(next)
    history.replaceState(null, '', `/${next}/components/${slug()}`)
  }
  const selectComponent = (next: string) => {
    setSlug(next)
    history.replaceState(null, '', `/${framework()}/components/${next}`)
    window.scrollTo({ top: 0 })
  }
  onMount(() => {
    const receive = (event: MessageEvent<PreviewRuntimeMessage>) => {
      if (event.data?.protocol !== PREVIEW_PROTOCOL) return
      if (event.data.type === 'ready') pushProps()
      if (event.data.type === 'resize') setPreviewHeight(Math.max(140, event.data.height))
      if (event.data.type === 'event' || event.data.type === 'error')
        setEvents((current) => [event.data, ...current].slice(0, 8))
    }
    addEventListener('message', receive)
    onCleanup(() => {
      removeEventListener('message', receive)
    })
  })

  return (
    <div class="shell">
      <header>
        <a class="brand" href="/">
          Fex Design
        </a>
        <nav>
          Docs <strong>Components</strong> Patterns CLI
        </nav>
        <div class="frameworks">
          <For each={frameworks}>
            {(item) => (
              <button data-active={item === framework()} onClick={() => selectFramework(item)}>
                {item}
              </button>
            )}
          </For>
        </div>
      </header>
      <aside>
        <p class="eyebrow">COMPONENTS</p>
        <h3>组件</h3>
        <div class="component-list">
          <For each={componentSlugs}>
            {(item) => (
              <a
                classList={{ active: item === slug() }}
                href={`/${framework()}/components/${item}`}
                onClick={(event) => {
                  event.preventDefault()
                  selectComponent(item)
                }}
              >
                {titleFromSlug(item)}
              </a>
            )}
          </For>
        </div>
      </aside>
      <main>
        <h1>{title()}</h1>
        <p class="lead">{api()?.description ?? `查看 ${title()} 在五个框架中的组件文档。`}</p>
        <section class="layer-intro" id="overview">
          <h2>Primitive 与 UI</h2>
          <p>两种层级具有一致的按钮语义和交互能力，区别在于由谁负责组合。</p>
          <div class="layer-intro-grid">
            <article>
              <div class="layer-intro-title">
                <strong>Primitive</strong>
                <span>自由组合</span>
              </div>
              <p>
                一组职责单一、可以独立组合的原子部件。它提供按钮语义、状态、图标布局和分组关系，不替你决定具体业务组合。
              </p>
              <div class="component-badges">
                <code>Button</code>
                <code>ButtonIcon</code>
                <code>ButtonGroup</code>
              </div>
              <p class="layer-choice">
                适合设计系统、品牌化组件，以及需要完全控制结构和样式的场景。
              </p>
            </article>
            <article>
              <div class="layer-intro-title">
                <strong>UI</strong>
                <span>快捷使用</span>
              </div>
              <p>
                Primitive 的推荐组合与预设外观。通过 variant、size、loading、icon
                等属性完成常见按钮需求，减少重复组装。
              </p>
              <div class="component-badges">
                <code>Button</code>
                <code>ButtonGroup</code>
              </div>
              <p class="layer-choice">适合业务页面和希望直接使用统一设计规范的场景。</p>
            </article>
          </div>
          <div class="composition-grid" id="composition">
            <div class="composition">
              <h3>Primitive Composition</h3>
              <p>显式组合原子部件；图标使用 ButtonIcon，相关操作使用 ButtonGroup。</p>
              <div class="composition-code">
                <button
                  class="icon-button"
                  title="复制 Primitive 组件结构"
                  aria-label="复制 Primitive 组件结构"
                  onClick={() => void navigator.clipboard.writeText(primitiveButtonComposition)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
                <pre>{primitiveButtonComposition}</pre>
              </div>
            </div>
            <div class="composition">
              <h3>UI Composition</h3>
              <p>Button 内部组合由快捷属性完成；多个相关操作仍使用 ButtonGroup。</p>
              <div class="composition-code">
                <button
                  class="icon-button"
                  title="复制 UI 组件结构"
                  aria-label="复制 UI 组件结构"
                  onClick={() => void navigator.clipboard.writeText(uiButtonComposition)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
                  </svg>
                </button>
                <pre>{uiButtonComposition}</pre>
              </div>
            </div>
          </div>
        </section>
        <Show when={layer() === 'primitive'}>
          <section class="primitive-guide" id="primitive-guide">
            <h2>组件结构</h2>
            <p>
              Button Primitive
              是职责完整的原子组件族，三个部件可以独立使用，也可以组合成一套自定义按钮系统。
            </p>
            <pre class="anatomy">
              Button{`\n`}├── ButtonIcon{`\n`}└── ButtonGroup{`\n    `}└── Button × n
            </pre>
            <div class="part-grid">
              <div>
                <h3>Button</h3>
                <p>
                  完整承接原生 <code>button</code> 的语义、ref、属性和事件，并统一
                  class、焦点、禁用状态与 SVG 布局。
                </p>
              </div>
              <div>
                <h3>ButtonIcon</h3>
                <p>负责按钮内部图标的位置、尺寸继承、data attribute 和可选交互效果。</p>
              </div>
              <div>
                <h3>ButtonGroup</h3>
                <p>负责相关按钮的语义分组、连接边界、水平或垂直方向以及自定义间距。</p>
              </div>
            </div>
            <h2>原子能力</h2>
            <p>
              Primitive 自身就是可以直接使用和扩展的完整实现。UI Button
              只是仓库提供的一套预制视觉组合，不是 Primitive 的能力补丁。
            </p>
            <ul class="recommendations">
              <li>布局：inline-flex、内容居中、文字不换行、SVG 尺寸继承。</li>
              <li>交互：pointer、文本不可选择、transition 和键盘 focus ring。</li>
              <li>状态：disabled、aria-pressed 与 data-loading 都有稳定的交互和视觉反馈。</li>
              <li>扩展：用户 class 与基础 class 合并，可以自由定义尺寸、颜色、边框和主题。</li>
              <li>组合：ButtonIcon 和 ButtonGroup 使用稳定的 data attributes 与 Button 协同。</li>
            </ul>
            <h2>推荐组合</h2>
            <ul class="recommendations">
              <li>直接为 Button 提供 class，构建项目自己的尺寸、颜色和状态体系。</li>
              <li>按钮包含图标时使用 ButtonIcon，让位置、SVG 尺寸和效果保持一致。</li>
              <li>
                相关操作使用 ButtonGroup；默认连接边界，设置 spacing 后保留每个按钮的独立圆角。
              </li>
              <li>选择、切换或标签页仍应使用对应的 Selection、Toggle Group 或 Tabs 状态模型。</li>
            </ul>
          </section>
        </Show>
        <section id="examples">
          <h2>示例</h2>
          <p>
            {layer() === 'primitive'
              ? '以下示例展示 Button 的视觉、尺寸、状态、加载、图标、交互效果和按钮组用法。'
              : '以下示例展示 Button 的视觉类型、尺寸、状态、加载、图标、交互效果和组合用法。'}
          </p>
          <For each={slug() === 'button' ? buttonExamples[layer()] : []}>
            {(scene) => (
              <DemoCard scene={scene} framework={framework()} layer={layer()} slug={slug()} />
            )}
          </For>
        </section>
        <section id="api">
          <h2>API</h2>
          <h3 class="api-subtitle">Primitive Button</h3>
          <p>
            继承并透传当前框架对应的全部原生 button 属性和事件，默认 type="button"。表格只列
            Primitive 新增的 API。
          </p>
          <ApiTable value={primitiveButton} framework={framework()} />
          <h3 class="api-subtitle">Primitive ButtonIcon</h3>
          <p>继承并透传原生 span 属性。用于 Button 内部的图标布局。</p>
          <div class="table">
            <div class="tr head">
              <span>属性</span>
              <span>类型</span>
              <span>默认值</span>
              <span>说明</span>
            </div>
            <div class="tr">
              <code>placement</code>
              <code>'start' | 'end'</code>
              <code>start</code>
              <span>图标位于按钮文本之前或之后。</span>
            </div>
            <div class="tr">
              <code>effect</code>
              <code>ButtonEffect</code>
              <code>—</code>
              <span>用于 expand-icon 等图标位移效果。</span>
            </div>
            <div class="tr">
              <code>data-icon</code>
              <code>string</code>
              <code>inline-start / inline-end</code>
              <span>稳定的图标位置标记，供 Button 布局和外部样式使用。</span>
            </div>
          </div>
          <h3 class="api-subtitle">UI Button</h3>
          <p>继承并透传原生 button 属性和事件。下表列出 UI Button 新增的完整业务属性。</p>
          <ApiTable value={button} framework={framework()} />
          <h3 class="api-subtitle">Primitive / UI ButtonGroup</h3>
          <p>
            继承并透传原生 div 属性。默认设置 role="group" 和
            data-slot="button-group"，只负责排列与相邻边界。
          </p>
          <div class="table">
            <div class="tr head">
              <span>属性</span>
              <span>类型</span>
              <span>默认值</span>
              <span>说明</span>
            </div>
            <div class="tr">
              <code>orientation</code>
              <code>'horizontal' | 'vertical'</code>
              <code>horizontal</code>
              <span>按钮组排列方向，同时写入 data-orientation。</span>
            </div>
            <div class="tr">
              <code>spacing</code>
              <code>number | string</code>
              <code>0</code>
              <span>按钮间距；0 使用连接式边界，大于 0 时按钮保持独立圆角。</span>
            </div>
          </div>
        </section>
      </main>
      <div class="toc">
        <Anchor items={tocItems()} offset={anchorOffset} behavior="auto" />
      </div>
    </div>
  )
}

render(() => <App />, document.getElementById('root')!)
