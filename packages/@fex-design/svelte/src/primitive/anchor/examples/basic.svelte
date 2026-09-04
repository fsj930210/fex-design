<script lang="ts">
  import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '@fex-design/svelte/primitive/anchor'
  let container: HTMLDivElement
</script>
<div bind:this={container} class="grid h-80 w-full max-w-2xl grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
  <AnchorRoot container={() => container} class="sticky top-0 self-start"><AnchorRail><AnchorIndicator /></AnchorRail><AnchorList><AnchorItem value="overview" target="#svelte-basic-overview"><AnchorLink>概览</AnchorLink></AnchorItem><AnchorItem value="usage" target="#svelte-basic-usage"><AnchorLink>使用方式</AnchorLink><AnchorList><AnchorItem value="api" target="#svelte-basic-api"><AnchorLink>API</AnchorLink></AnchorItem></AnchorList></AnchorItem></AnchorList></AnchorRoot>
  <div class="grid gap-24 pb-48"><section id="svelte-basic-overview"><h3 class="font-semibold">概览</h3><p class="text-muted-foreground">Anchor 根据滚动位置同步当前章节。</p></section><section id="svelte-basic-usage"><h3 class="font-semibold">使用方式</h3><p class="text-muted-foreground">点击项目滚动到对应内容。</p></section><section id="svelte-basic-api"><h3 class="font-semibold">API</h3><p class="text-muted-foreground">通过结构化组件自由组合。</p></section></div>
</div>
