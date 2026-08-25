<script lang="ts">
  import { onMount } from 'svelte'
  import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
  import type { ApiValue } from '@fex-design/docs-shared/model'
  let values: Record<string, ApiValue> = $state({})
  const path = location.pathname.split('/').filter(Boolean), layer = path.at(-3), component = path.at(-2), demo = path.at(-1)
  const embedded = new URLSearchParams(location.search).get('embed') === 'true'
  const modules = import.meta.glob('../../../../packages/@fex-design/svelte/src/{primitive,ui}/button/examples/*.svelte', { eager: true }) as Record<string, { default: any }>
  const examplePath = Object.keys(modules).find(key => key.includes(`/${layer}/button/examples/${demo}.svelte`))
  const Example = examplePath ? modules[examplePath].default : undefined
  const send = (type: string, payload = {}) => parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'svelte', ...payload }, '*')
  onMount(() => { const receive = (event: MessageEvent) => { if (isPreviewHostMessage(event.data)) values = event.data.props }; addEventListener('message', receive); const runtime = document.querySelector<HTMLElement>('.runtime')!; const sendResize = () => send('resize', { height: Math.ceil(runtime.scrollHeight) }); const observer = new ResizeObserver(sendResize); observer.observe(runtime); send('ready'); sendResize(); return () => { removeEventListener('message', receive); observer.disconnect() } })
</script>
<div class="runtime" data-embed={embedded ? 'true' : undefined}>{#if component === 'button' && Example}<Example />{:else}<p>未找到示例：{layer}/{component}/{demo}</p>{/if}</div>
