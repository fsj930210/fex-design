<script lang="ts">
  import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
  import { ScrollbarRoot, ScrollbarViewport, ScrollbarBar, ScrollbarCorner, ScrollbarTrack, ScrollbarThumb } from '@fex-design/svelte/primitive/scrollbar';
</script>

<ScrollbarRoot class="h-48 w-72 rounded-md border" autoHide="never" overflow={{ x: 'hidden' }}>
  <ScrollbarViewport overflow={{ y: 'auto' }}>
    <div class="grid gap-3 p-4">
        {#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}
      </div>
  </ScrollbarViewport>
  <ScrollbarBar axis="y">
    <ScrollbarTrack axis="y">
      <ScrollbarThumb axis="y" />
    </ScrollbarTrack>
  </ScrollbarBar>
  <ScrollbarCorner />
</ScrollbarRoot>
