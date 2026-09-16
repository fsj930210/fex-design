import { createEffect, createResource, createSignal, onCleanup, onMount, Show } from 'solid-js'
import { PREVIEW_PROTOCOL } from '@fex-design/docs-shared/preview-protocol'
import { ExampleCard } from './example-card'
import { Spinner } from '@fex-design/solid/primitive/spinner'
import type { Framework, PreviewRuntimeMessage } from './types'

const developmentOrigins: Record<Framework, string> = {
  angular: 'http://127.0.0.1:4110',
  react: 'http://127.0.0.1:4111',
  solid: 'http://127.0.0.1:4112',
  svelte: 'http://127.0.0.1:4113',
  vue: 'http://127.0.0.1:4114',
}

export function DemoCard(props: {
  scene: { id: string; title: string; description: string }
  framework: Framework
  layer: 'primitive' | 'ui'
  slug: string
  layers: readonly ('primitive' | 'ui')[]
}) {
  const [tab, setTab] = createSignal<'preview' | 'code'>('preview')
  const [demoLayer, setDemoLayer] = createSignal<'primitive' | 'ui'>(props.layer)
  const [copied, setCopied] = createSignal(false)
  const [height, setHeight] = createSignal(180)
  const [ready, setReady] = createSignal(false)
  const [failed, setFailed] = createSignal(false)
  const [shouldLoad, setShouldLoad] = createSignal(false)
  const [manualAttempt, setManualAttempt] = createSignal(0)
  let article!: HTMLElement
  let frame!: HTMLIFrameElement
  let readyTimeout: number | undefined
  const url = () => {
    if (import.meta.env.DEV) {
      return `${developmentOrigins[props.framework]}/examples/${props.framework}/${demoLayer()}/${props.slug}/${props.scene.id}?embed=true`
    }
    return `${import.meta.env.BASE_URL}previews/${props.framework}/?layer=${demoLayer()}&component=${props.slug}&demo=${props.scene.id}&embed=true`
  }
  const [source] = createResource(
    () =>
      tab() === 'code'
        ? `${props.framework}:${demoLayer()}:${props.slug}:${props.scene.id}`
        : undefined,
    async () => {
      const response = await fetch(
        import.meta.env.DEV
          ? `/__example-source?framework=${props.framework}&layer=${demoLayer()}&component=${props.slug}&example=${props.scene.id}`
          : `${import.meta.env.BASE_URL}example-source/${props.framework}/${demoLayer()}/${props.slug}/${props.scene.id}.json`,
      )
      if (!response.ok) throw new Error('Example source not found')
      return response.json() as Promise<{ source: string; html: string }>
    },
  )

  createEffect(() => {
    url()
    setReady(false)
    setFailed(false)
    setManualAttempt(0)
  })
  const frameUrl = () => `${url()}&previewAttempt=${manualAttempt()}`
  const clearReadyTimeout = () => {
    if (readyTimeout !== undefined) window.clearTimeout(readyTimeout)
    readyTimeout = undefined
  }
  const waitForReady = () => {
    clearReadyTimeout()
    readyTimeout = window.setTimeout(() => {
      if (shouldLoad() && !ready()) setFailed(true)
    }, 10_000)
  }
  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isNearViewport = Boolean(entry?.isIntersecting)
        setShouldLoad(isNearViewport)
        if (isNearViewport && !ready()) waitForReady()
        else if (!isNearViewport) {
          setReady(false)
          clearReadyTimeout()
        }
      },
      { rootMargin: '100px 0px' },
    )
    observer.observe(article)
    const receive = (event: MessageEvent<PreviewRuntimeMessage>) => {
      if (event.source !== frame?.contentWindow || event.data?.protocol !== PREVIEW_PROTOCOL) return
      if (event.data.type === 'ready') {
        setReady(true)
        setFailed(false)
        clearReadyTimeout()
      }
      if (event.data.type === 'resize') setHeight(Math.max(140, Math.ceil(event.data.height)))
    }
    addEventListener('message', receive)
    onCleanup(() => {
      observer.disconnect()
      clearReadyTimeout()
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
    <article
      ref={(element) => {
        article = element
      }}
      class="mt-9.5"
      id={`example-${props.scene.id}`}
      data-toc-item
      data-toc-title={props.scene.title}
    >
      <h3 class="m-0 text-lg font-semibold">{props.scene.title}</h3>
      <p class="mt-1.5 mb-0 leading-relaxed text-muted-foreground">{props.scene.description}</p>
      <ExampleCard
        tab={tab()}
        layer={demoLayer()}
        layers={props.layers}
        copied={copied()}
        standaloneHref={url().replace('?embed=true', '')}
        onTabChange={setTab}
        onLayerChange={(layer) => {
          setDemoLayer(layer)
        }}
        onCopy={() => void copySource()}
      >
        <Show
          when={tab() === 'preview'}
          fallback={
            <div
              class="max-h-120 min-h-45 overflow-auto bg-background text-xs leading-relaxed [&_pre]:m-0 [&_pre]:min-h-45 [&_pre]:bg-background! [&_pre]:p-5.5"
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
          <div class="relative min-h-35 bg-background" style={{ height: `${height()}px` }}>
            <Show when={!shouldLoad() || !ready()}>
              <div class="absolute inset-0 z-1 grid place-items-center bg-background" role="status">
                <Show
                  when={!failed()}
                  fallback={
                    <button
                      class="cursor-pointer rounded-md border border-border bg-background px-3 py-2 text-sm text-primary"
                      onClick={() => {
                        setFailed(false)
                        setManualAttempt((attempt) => attempt + 1)
                      }}
                    >
                      示例加载失败，点击重试
                    </button>
                  }
                >
                  <Spinner size="lg" class="text-primary" aria-label="正在加载示例" />
                </Show>
              </div>
            </Show>
            <Show when={shouldLoad()}>
              <iframe
                ref={(element) => {
                  frame = element
                }}
                onLoad={() => {
                  frame.contentWindow?.postMessage(
                    { protocol: PREVIEW_PROTOCOL, type: 'render', props: {} },
                    '*',
                  )
                  waitForReady()
                }}
                class="block h-full min-h-35 w-full border-0 bg-background"
                data-ready={ready()}
                title={`${props.framework} ${demoLayer()} ${props.slug} ${props.scene.id}`}
                src={frameUrl()}
                loading="lazy"
                scrolling="no"
              />
            </Show>
          </div>
        </Show>
      </ExampleCard>
    </article>
  )
}
