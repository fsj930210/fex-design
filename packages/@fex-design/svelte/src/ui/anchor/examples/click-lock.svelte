<script lang="ts">
  import { Anchor } from '@fex-design/svelte/ui/anchor'
  const items=[{key:'first',title:'第一节',target:'#svelte-ui-click-lock-first'},{key:'second',title:'点击第二节',target:'#svelte-ui-click-lock-second'},{key:'third',title:'第三节',target:'#svelte-ui-click-lock-third'}]
  let container: HTMLDivElement
</script>
<div class="grid w-full max-w-2xl gap-3">
  <p class="text-sm text-muted-foreground">点击“第二节”：容器会滚到底，但高亮仍保留在点击项。</p>
  <div bind:this={container} class="grid h-72 grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4">
    <Anchor {items} container={()=>container} class="sticky top-0 self-start"/>
    <div class="grid gap-28 pb-16">{#each items as item}<section id={`svelte-ui-click-lock-${item.key}`}><h3 class="font-semibold">{item.title}</h3></section>{/each}</div>
  </div>
</div>
