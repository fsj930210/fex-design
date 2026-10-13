import { createResource, Show } from 'solid-js'
import './code-block.css'

export function CodeBlock(props: { code: string; language?: string }) {
  const [html] = createResource(
    () => ({ code: props.code, language: props.language ?? 'tsx' }),
    async ({ code, language }) => {
      const { highlightCode } = await import('./syntax-highlight')
      return highlightCode(code, language)
    },
  )

  return (
    <div class="docs-code-block min-w-0 text-foreground font-mono text-xs" dir="ltr">
      <Show
        when={!html.error && !html.loading && html()}
        fallback={<pre><code>{props.code}</code></pre>}
      >
        {(markup) => <div innerHTML={markup()} />}
      </Show>
    </div>
  )
}
