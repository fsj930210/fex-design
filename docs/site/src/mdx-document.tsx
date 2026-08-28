import { For, Show, type Component, type ParentProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { MDXProvider } from 'solid-mdx'
import { ApiTable } from './api-table'
import { componentApis, componentExamples, type DocumentedComponent } from './data'
import { DemoCard } from './demo-card'
import { CssVariableTable } from './css-variable-table'
import { resolveComponentApi } from './component-api'
import type { Framework } from './types'

type LayerName = 'primitive' | 'ui'

export function MdxDocument(props: {
  content: Component
  slug: DocumentedComponent
  framework: Framework
  layer: LayerName
}) {
  const availableLayers = (sceneId: string): readonly LayerName[] =>
    (['primitive', 'ui'] as const).filter((layer) =>
      componentExamples[props.slug][layer].some((scene) => scene.id === sceneId),
    )
  const components = {
    Layer: (layerProps: ParentProps<{ value: LayerName }>) => (
      <Show when={layerProps.value === props.layer}>{layerProps.children}</Show>
    ),
    Demos: () => (
      <div>
        <For each={componentExamples[props.slug][props.layer]}>
          {(scene) => (
            <DemoCard
              scene={scene}
              framework={props.framework}
              layer={props.layer}
              slug={props.slug}
              layers={availableLayers(scene.id)}
            />
          )}
        </For>
      </div>
    ),
    Api: (apiProps: { layer?: LayerName }) => (
      <ApiTable
        value={componentApis[props.slug][apiProps.layer ?? props.layer]}
        framework={props.framework}
      />
    ),
    ApiSection: (apiProps: { layer: LayerName; title: string; description: string }) => {
      const value = componentApis[props.slug][apiProps.layer]
      const nativeApi = resolveComponentApi(value, props.framework)
      return (
        <Show when={componentApis[props.slug][apiProps.layer].nativeElement || nativeApi.props.length > 0 || nativeApi.events.length > 0 || nativeApi.slots.length > 0}>
          <h3 id={`${apiProps.layer}-api`} class="mt-8 mb-2 text-lg font-semibold">
            {apiProps.title}
          </h3>
          <p class="leading-relaxed text-foreground">{apiProps.description}</p>
          <ApiTable value={value} framework={props.framework} />
        </Show>
      )
    },
    CssVariables: () => (
      <CssVariableTable value={componentApis[props.slug][props.layer].cssVariables ?? []} />
    ),
    h2: (headingProps: ParentProps<{ id?: string }>) => (
      <h2 id={headingProps.id} class="mt-14 mb-2 text-2xl font-semibold">
        {headingProps.children}
      </h2>
    ),
    h3: (headingProps: ParentProps<{ id?: string }>) => (
      <h3 id={headingProps.id} class="mt-8 mb-2 text-lg font-semibold">
        {headingProps.children}
      </h3>
    ),
    p: (paragraphProps: ParentProps) => (
      <p class="leading-relaxed text-foreground">{paragraphProps.children}</p>
    ),
    ul: (listProps: ParentProps) => (
      <ul class="mt-3 mb-6 list-disc pl-6 leading-7 text-foreground">{listProps.children}</ul>
    ),
    pre: (preProps: ParentProps) => (
      <pre class="my-4 mb-7 overflow-x-auto rounded-xl border border-border bg-muted-background px-5 py-4.5 text-foreground [&>code]:block [&>code]:whitespace-pre [&>code]:font-mono">
        {preProps.children}
      </pre>
    ),
    code: (codeProps: ParentProps & { class?: string }) => <code class={codeProps.class ?? 'font-mono'}>{codeProps.children}</code>,
    table: (tableProps: ParentProps) => (
      <div class="my-4 overflow-x-auto rounded-xl border border-border">
        <table class="w-full border-collapse text-left text-sm">{tableProps.children}</table>
      </div>
    ),
    thead: (headProps: ParentProps) => <thead class="bg-muted-background">{headProps.children}</thead>,
    th: (cellProps: ParentProps) => <th class="px-4 py-3 font-medium text-muted-foreground">{cellProps.children}</th>,
    td: (cellProps: ParentProps) => <td class="border-t border-border px-4 py-3 align-top">{cellProps.children}</td>,
  }
  return (
    <MDXProvider components={components}>
      <Dynamic component={props.content} />
    </MDXProvider>
  )
}
