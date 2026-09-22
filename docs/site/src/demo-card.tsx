import { createEffect, createResource, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { PREVIEW_PROTOCOL } from '@fex-design/docs-shared/preview-protocol'
import { Card } from '@fex-design/solid/ui/card'
import { Spinner } from '@fex-design/solid/primitive/spinner'
import type { Framework, PreviewRuntimeMessage } from './types'

const getCurrentTheme = (): 'light' | 'dark' => {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

const developmentOrigins: Record<Framework, string> = {
  angular: 'http://127.0.0.1:4110',
  react: 'http://127.0.0.1:4111',
  solid: 'http://127.0.0.1:4112',
  svelte: 'http://127.0.0.1:4113',
  vue: 'http://127.0.0.1:4114',
}

const MINIMUM_PREVIEW_HEIGHT = 240

type DemoLayer = 'primitive' | 'ui'

export function DemoCard(props: {
  scene: { id: string; title: string; description: string; height?: number }
  framework: Framework
  layer: DemoLayer
  slug: string
  layers: readonly DemoLayer[]
}) {
  const hasBothLayers = () => props.layers.includes('ui') && props.layers.includes('primitive')

  return (
    <article
      class="mt-9.5"
      id={`example-${props.scene.id}`}
      data-toc-item
      data-toc-title={props.scene.title}
    >
      <div class="flex items-baseline justify-between gap-4">
        <h3 class="m-0 text-lg font-semibold text-foreground">{props.scene.title}</h3>
        
      </div>
      <p class="mt-1.5 mb-0 leading-relaxed text-muted-foreground text-sm">{props.scene.description}</p>

      <Show
        when={hasBothLayers()}
        fallback={
          <div class="mt-3.5">
            <SingleDemoPanel
              layer={props.layers[0] || props.layer}
              scene={props.scene}
              framework={props.framework}
              slug={props.slug}
            />
          </div>
        }
      >
        <div class="mt-3.5 flex flex-col md:flex-row gap-4 w-full items-stretch">
          <SingleDemoPanel
            layer="ui"
            scene={props.scene}
            framework={props.framework}
            slug={props.slug}
          />
          <SingleDemoPanel
            layer="primitive"
            scene={props.scene}
            framework={props.framework}
            slug={props.slug}
          />
        </div>
      </Show>
    </article>
  )
}

function SingleDemoPanel(props: {
  layer: DemoLayer
  scene: { id: string; title: string; description: string; height?: number }
  framework: Framework
  slug: string
}) {
  const [tab, setTab] = createSignal<'preview' | 'code'>('preview')
  const [copied, setCopied] = createSignal(false)
  const minimumHeight = () => props.scene.height ?? MINIMUM_PREVIEW_HEIGHT
  const [height, setHeight] = createSignal(minimumHeight())
  const [ready, setReady] = createSignal(false)
  const [hasEntered, setHasEntered] = createSignal(false)
  let panel!: HTMLElement
  let frame!: HTMLIFrameElement

  const runtimeUrl = () => {
    const theme = getCurrentTheme()
    const host = typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1'
    if (import.meta.env.DEV) {
      const origin = developmentOrigins[props.framework].replace('127.0.0.1', host)
      return `${origin}/?embed=true&theme=${theme}`
    }
    return `${import.meta.env.BASE_URL}previews/${props.framework}/?embed=true&theme=${theme}`
  }

  const standaloneHref = () => {
    if (import.meta.env.DEV) {
      return `${developmentOrigins[props.framework]}/examples/${props.framework}/${props.layer}/${props.slug}/${props.scene.id}`
    }
    return `${import.meta.env.BASE_URL}previews/${props.framework}/?layer=${props.layer}&component=${props.slug}&demo=${props.scene.id}`
  }

  const sendRender = () => {
    if (!frame?.contentWindow) return
    frame.contentWindow.postMessage(
      {
        protocol: PREVIEW_PROTOCOL,
        type: 'render',
        layer: props.layer,
        component: props.slug,
        demo: props.scene.id,
        props: {},
        theme: getCurrentTheme(),
      },
      '*',
    )
  }

  const [source] = createResource(
    () =>
      tab() === 'code'
        ? `${props.framework}:${props.layer}:${props.slug}:${props.scene.id}`
        : undefined,
    async () => {
      const response = await fetch(
        import.meta.env.DEV
          ? `/__example-source?framework=${props.framework}&layer=${props.layer}&component=${props.slug}&example=${props.scene.id}`
          : `${import.meta.env.BASE_URL}example-source/${props.framework}/${props.layer}/${props.slug}/${props.scene.id}.json`,
      )
      if (!response.ok) throw new Error('Example source not found')
      return response.json() as Promise<{ source: string; html: string }>
    },
  )

  createEffect(() => {
    props.slug
    props.scene.id
    if (ready()) {
      sendRender()
    }
  })

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(panel)

    const receive = (event: MessageEvent<PreviewRuntimeMessage>) => {
      if (event.source !== frame?.contentWindow || event.data?.protocol !== PREVIEW_PROTOCOL) return
      if (event.data.type === 'ready') {
        setReady(true)
        sendRender()
      }
      if (event.data.type === 'resize') {
        setHeight(Math.max(minimumHeight(), Math.ceil(event.data.height)))
      }
    }
    addEventListener('message', receive)
    onCleanup(() => {
      observer.disconnect()
      removeEventListener('message', receive)
    })
  })

  const copySource = async () => {
    if (!source()) return
    await navigator.clipboard.writeText(source()!.source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div ref={panel} class="flex-1 min-w-0 overflow-hidden rounded-xl border border-border bg-card shadow-sm flex flex-col">
      {/* Panel Header */}
      <div class="flex items-center justify-between border-b border-border bg-muted/40 px-3 py-2 text-xs">
        <div class="flex items-center gap-1.5">
          <button
            class={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
              tab() === 'preview'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setTab('preview')}
          >
            预览
          </button>
          <button
            class={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors ${
              tab() === 'code'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setTab('code')}
          >
            源码
          </button>
        </div>

        {/* Layer Badge */}
        <div class="flex items-center gap-2">
          <span
            class={`rounded px-2 py-0.5 text-[11px] font-semibold border ${
              props.layer === 'ui'
                ? 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400'
                : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400'
            }`}
          >
            {props.layer === 'ui' ? 'UI (开箱即用)' : 'Primitive (解构拼装)'}
          </span>
        </div>

        {/* Actions */}
        <div class="flex items-center gap-1">
          <Show when={tab() === 'code'}>
            <button
              class="grid size-7 cursor-pointer place-items-center rounded-md text-muted-foreground hover:bg-background hover:text-foreground"
              aria-label="复制源码"
              onClick={() => void copySource()}
            >
              <Show when={copied()} fallback={<CopyIcon />}>
                <CheckIcon />
              </Show>
            </button>
          </Show>
          <a
            class="grid size-7 place-items-center rounded-md text-muted-foreground no-underline hover:bg-background hover:text-foreground"
            href={standaloneHref()}
            target="_blank"
            rel="noreferrer"
            aria-label="新窗口打开"
          >
            <OpenIcon />
          </a>
        </div>
      </div>

      {/* Panel Content */}
      <div class="flex-1 bg-background">
        <Show
          when={tab() === 'preview'}
          fallback={
            <div
              class="max-h-120 min-h-45 overflow-auto bg-background p-4 text-xs leading-relaxed font-mono"
              innerHTML={
                source.loading
                  ? '<pre>正在读取源码…</pre>'
                  : source.error
                    ? '<pre>源码加载失败。</pre>'
                    : (source()?.html ?? '')
              }
            />
          }
        >
          <div class="relative bg-background" style={{ height: `${height()}px` }}>
            <Show when={!ready()}>
              <div class="absolute inset-0 z-1 grid place-items-center bg-background" role="status">
                <Spinner size="lg" class="text-primary" aria-label="正在加载示例" />
              </div>
            </Show>
            <Show when={hasEntered()}>
              <iframe
                ref={(element) => {
                  frame = element
                }}
                class="block h-full w-full border-0 bg-background opacity-0 transition-opacity duration-150 data-[ready=true]:opacity-100"
                data-ready={ready()}
                title={`${props.framework} ${props.layer} ${props.slug} ${props.scene.id}`}
                src={runtimeUrl()}
                loading="lazy"
                scrolling="auto"
                onLoad={() => {
                  sendRender()
                }}
              />
            </Show>
          </div>
        </Show>
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg class="size-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg class="size-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M15 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h3" />
    </svg>
  )
}

function OpenIcon() {
  return (
    <svg class="size-3.5 stroke-current fill-none stroke-[2]" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 5h5v5M10 14 19 5" />
      <path d="M19 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
    </svg>
  )
}




