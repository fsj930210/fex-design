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
  let frame!: HTMLIFrameElement
  const url = () => {
    if (import.meta.env.DEV) {
      return `${developmentOrigins[props.framework]}/examples/${props.framework}/${demoLayer()}/${props.slug}/${props.scene.id}?embed=true`
    }
    return `${import.meta.env.BASE_URL}previews/${props.framework}/?layer=${demoLayer()}&component=${props.slug}&demo=${props.scene.id}&embed=true`
  }
  const [source] = createResource(
    () => `${props.framework}:${demoLayer()}:${props.slug}:${props.scene.id}`,
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
  })
  onMount(() => {
    const receive = (event: MessageEvent<PreviewRuntimeMessage>) => {
      if (event.source !== frame?.contentWindow || event.data?.protocol !== PREVIEW_PROTOCOL) return
      if (event.data.type === 'ready') setReady(true)
      if (event.data.type === 'resize') setHeight(Math.max(140, Math.ceil(event.data.height)))
    }
    addEventListener('message', receive)
    onCleanup(() => removeEventListener('message', receive))
  })
  const copySource = async () => {
    if (!source()) return
    await navigator.clipboard.writeText(source()!.source)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <article
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
            <Show when={!ready()}>
              <div class="absolute inset-0 z-1 grid place-items-center bg-background" role="status">
                <Spinner size="lg" class="text-primary" aria-label="正在加载示例" />
              </div>
            </Show>
            <iframe
              ref={(element) => {
                frame = element
              }}
              class="block h-full min-h-35 w-full border-0 bg-background opacity-0 transition-opacity duration-150 data-[ready=true]:opacity-100"
              data-ready={ready()}
              title={`${props.framework} ${demoLayer()} ${props.slug} ${props.scene.id}`}
              src={url()}
              scrolling="no"
            />
          </div>
        </Show>
      </ExampleCard>
    </article>
  )
}
