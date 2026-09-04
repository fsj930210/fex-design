<script lang="ts">
  import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '@fex-design/svelte/primitive/anchor'
  let container: HTMLDivElement
</script>
<div bind:this={container} class="grid h-80 w-full max-w-2xl grid-cols-[11rem_1fr] gap-6 overflow-auto rounded-lg border p-4"><AnchorRoot container={() => container} targetOffset={48} class="sticky top-0 self-start"><AnchorRail><AnchorIndicator /></AnchorRail><AnchorList><AnchorItem value="global" target="#svelte-offset-global"><AnchorLink>全局偏移 48px</AnchorLink></AnchorItem><AnchorItem value="item" target="#svelte-offset-item" targetOffset={96}><AnchorLink>单项覆盖 96px</AnchorLink></AnchorItem></AnchorList></AnchorRoot><div class="grid gap-40 pb-64"><section id="svelte-offset-global"><h3 class="font-semibold">使用全局偏移</h3></section><section id="svelte-offset-item"><h3 class="font-semibold">覆盖单项偏移</h3></section></div></div>
