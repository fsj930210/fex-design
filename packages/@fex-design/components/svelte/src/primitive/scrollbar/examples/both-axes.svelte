<script lang="ts">
  import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
  import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb, ScrollbarCorner } from '@fex-design/svelte/primitive/scrollbar';
</script>
<div class="flex w-full flex-wrap gap-6">
  <section class="grid gap-3"><h4 class="text-sm font-medium">横向、纵向与交角</h4>
    <ScrollbarRoot class="h-48 w-72 rounded-md border" autoHide={"never"} overflow={{"x":"auto","y":"auto"}}><ScrollbarViewport><div class="grid w-[40rem] gap-3 p-4">{#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}</div></ScrollbarViewport>
      <ScrollbarBar axis={"x"}><ScrollbarTrack axis={"x"}><ScrollbarThumb axis={"x"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarBar axis={"y"}><ScrollbarTrack axis={"y"}><ScrollbarThumb axis={"y"}></ScrollbarThumb></ScrollbarTrack></ScrollbarBar>
      <ScrollbarCorner></ScrollbarCorner></ScrollbarRoot>
  </section>
</div>
