<script lang="ts">
  import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '@fex-design/svelte/primitive/anchor'
  const steps = [['prepare','准备工作'],['install','安装'],['configure','配置'],['finish','完成']] as const
  let container: HTMLDivElement
</script>
<div bind:this={container} class="grid h-80 w-full max-w-2xl grid-cols-[10rem_1fr] gap-6 overflow-auto rounded-lg border p-4"><AnchorRoot activeMode="progress" container={() => container} class="sticky top-0 self-start"><AnchorRail><AnchorIndicator /></AnchorRail><AnchorList>{#each steps as [key,title]}<AnchorItem value={key} target={`#svelte-progress-${key}`}><AnchorLink>{title}</AnchorLink></AnchorItem>{/each}</AnchorList></AnchorRoot><div class="grid gap-24 pb-48">{#each steps as [key,title]}<section id={`svelte-progress-${key}`}><h3 class="font-semibold">{title}</h3></section>{/each}</div></div>
