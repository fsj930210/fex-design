import { createMemo, For, Show, type Component, type ParentProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { MDXProvider } from 'solid-mdx'
import { ApiTable } from './api-table'
import { ApiComparison, ApiContainer } from './api-comparison'
import { componentApis, componentExamples, type DocumentedComponent } from './data'
import { DemoCard } from './demo-card'
import { CssVariableTable } from './css-variable-table'
import { resolveComponentApi } from './component-api'
import { Installation } from './installation'
import { LayerComparison } from './layer-comparison'
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
      componentExamples[props.slug][layer]?.some((scene) => scene.id === sceneId),
    )

  const components = {
    Installation: () => <Installation slug={props.slug} framework={props.framework} />,
    ManualInstall: () => <Installation slug={props.slug} framework={props.framework} />,
    LayerComparison: () => null,
    Layer: (layerProps: ParentProps<{ value: LayerName }>) => (
      <Show when={layerProps.value === props.layer}>{layerProps.children}</Show>
    ),
    Demos: () => {
      const allScenes = createMemo(() => {
        const uiScenes = componentExamples[props.slug].ui || []
        const primScenes = componentExamples[props.slug].primitive || []
        const seen = new Set<string>()
        const list: Array<{ id: string; title: string; description: string; height?: number }> = []
        for (const s of [...uiScenes, ...primScenes]) {
          if (!seen.has(s.id)) {
            seen.add(s.id)
            list.push(s)
          }
        }
        return list
      })

      return (
        <div class="space-y-6">
          <For each={allScenes()}>
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
      )
    },
    Api: (apiProps: { layer?: LayerName }) => (
      <ApiTable
        value={componentApis[props.slug][apiProps.layer ?? props.layer]}
        framework={props.framework}
      />
    ),
    ApiContainer: (containerProps: ParentProps) => (
      <div class="my-8 flex flex-col xl:flex-row gap-6 w-full items-start">
        {containerProps.children}
      </div>
    ),
    ApiComparison: () => (
      <ApiComparison slug={props.slug} framework={props.framework} />
    ),
    ApiSection: (
      apiProps: ParentProps<{ layer: LayerName; title?: string; description?: string }>,
    ) => {
      const value = () => componentApis[props.slug]?.[apiProps.layer]
      const nativeApi = () =>
        value()
          ? resolveComponentApi(value(), props.framework)
          : { props: [], events: [], slots: [] }
      const isUi = () => apiProps.layer === 'ui'

      return (
        <Show
          when={
            value() &&
            (value().components?.length ||
              value().nativeElement ||
              nativeApi().props.length > 0 ||
              nativeApi().events.length > 0 ||
              nativeApi().slots.length > 0)
          }
        >
          <div class="flex-1 min-w-0 w-full rounded-xl border border-border bg-card p-5 shadow-sm">
            <div class="flex items-center justify-between border-b border-border pb-3 mb-4">
              <div>
                <h3 id={apiProps.layer + '-api'} class="text-base font-bold text-foreground">
                  {apiProps.title ?? (isUi() ? 'UI API' : 'Primitive API')}
                </h3>
                <Show when={apiProps.description}>
                  <p class="mt-0.5 text-xs text-secondary-foreground">{apiProps.description}</p>
                </Show>
              </div>
              <span
                class={'rounded px-2 py-0.5 text-[11px] font-semibold border ' +
                  (isUi()
                    ? 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400'
                    : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-400')}
              >
                {isUi() ? 'UI (开箱即用)' : 'Primitive (解构拼装)'}
              </span>
            </div>
            {apiProps.children}
            <ApiTable value={value()} framework={props.framework} />
          </div>
        </Show>
      )
    },
    ApiComposition: (compositionProps: ParentProps<{ layer: LayerName }>) => (
      <div class="mb-5">
        <div class="mb-1.5 flex items-center gap-2">
          <span class="text-xs font-semibold text-secondary-foreground">
            拓扑结构 (Composition)
          </span>
        </div>
        <div class="overflow-x-auto rounded-lg border border-border bg-muted-background/60 p-2.5 text-xs font-mono">
          {compositionProps.children}
        </div>
      </div>
    ),
    CssVariables: () => (
      <CssVariableTable value={componentApis[props.slug][props.layer].cssVariables ?? []} />
    ),
    h2: (headingProps: ParentProps<{ id?: string }>) => (
      <h2 id={headingProps.id} class="mt-14 mb-3 text-2xl font-bold tracking-tight text-foreground">
        {headingProps.children}
      </h2>
    ),
    h3: (headingProps: ParentProps<{ id?: string }>) => (
      <h3 id={headingProps.id} class="mt-8 mb-2 text-lg font-semibold text-foreground">
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
    code: (codeProps: ParentProps & { class?: string }) => (
      <code class={codeProps.class ?? 'font-mono text-[0.9em] text-foreground font-medium'}>{codeProps.children}</code>
    ),
    table: (tableProps: ParentProps) => (
      <div class="my-4 overflow-x-auto rounded-xl border border-border">
        <table class="w-full border-collapse text-left text-sm">{tableProps.children}</table>
      </div>
    ),
    thead: (headProps: ParentProps) => (
      <thead class="bg-muted-background">{headProps.children}</thead>
    ),
    th: (cellProps: ParentProps) => (
      <th class="px-4 py-3 font-medium text-muted-foreground">{cellProps.children}</th>
    ),
    td: (cellProps: ParentProps) => (
      <td class="border-t border-border px-4 py-3 align-top">{cellProps.children}</td>
    ),
  }

  return (
    <MDXProvider components={components}>
      <Installation slug={props.slug} framework={props.framework} />
      <Dynamic component={props.content} />
    </MDXProvider>
  )
}
