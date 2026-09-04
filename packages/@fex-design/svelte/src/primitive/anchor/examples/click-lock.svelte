<script lang="ts">
  import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '@fex-design/svelte/primitive/anchor'
  const sections = [['first', '第一节'], ['second', '点击第二节'], ['third', '第三节']] as const
  let container: HTMLDivElement
</script>
<div class="grid w-full max-w-2xl gap-3">
  <p class="text-sm text-muted-foreground">点击“第二节”：容器会滚到底，但高亮仍保留在点击项。</p>
  <div bind:this={container} class="grid h-72 grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
    <AnchorRoot container={()=>container} class="sticky top-0 self-start"><AnchorRail><AnchorIndicator /></AnchorRail><AnchorList>{#each sections as [key,title]}<AnchorItem value={key} target={`#svelte-click-lock-${key}`}><AnchorLink>{title}</AnchorLink></AnchorItem>{/each}</AnchorList></AnchorRoot>
    <div class="grid gap-28 pb-16">{#each sections as [key,title]}<section id={`svelte-click-lock-${key}`}><h3 class="font-semibold">{title}</h3></section>{/each}</div>
  </div>
</div>
