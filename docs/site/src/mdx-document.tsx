import { For, Show, type Component, type ParentProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { MDXProvider } from 'solid-mdx'
import { ApiTable } from './api-table'
import { componentApis, componentExamples, type DocumentedComponent } from './data'
import { DemoCard } from './demo-card'
import { CssVariableTable } from './css-variable-table'
import type { Framework } from './types'

type LayerName = 'primitive' | 'ui'

export function MdxDocument(props: {
  content: Component
  slug: DocumentedComponent
  framework: Framework
  layer: LayerName
}) {
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
              layers={
                props.slug === 'card' && scene.id === 'styling' ? ['ui'] : ['primitive', 'ui']
              }
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
      return (
        <Show when={value.props.length > 0 || value.events.length > 0}>
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
      <pre class="my-4 mb-7 overflow-x-auto rounded-xl border border-border bg-muted-background px-5 py-4.5 text-foreground">
        {preProps.children}
      </pre>
    ),
    code: (codeProps: ParentProps) => <code class="font-mono">{codeProps.children}</code>,
  }
  return (
    <MDXProvider components={components}>
      <Dynamic component={props.content} />
    </MDXProvider>
  )
}
