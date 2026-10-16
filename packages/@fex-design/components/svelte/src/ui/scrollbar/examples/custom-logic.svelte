<script lang="ts">
  import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
  import { createScrollbar, ScrollbarViewport, ScrollbarBar, ScrollbarTrack, ScrollbarThumb } from '@fex-design/svelte/ui/scrollbar';
  const binding = createScrollbar(() => ({ autoHide: 'never' }));
</script>

<div use:binding.root data-slot="scrollbar-root" class="relative isolate h-48 w-72 overflow-hidden rounded-md border">
  <ScrollbarViewport overflow={{ x: 'hidden' }}>
    <div class="grid gap-3 p-4">
        {#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}
      </div>
  </ScrollbarViewport>
  <ScrollbarBar axis="y">
    <ScrollbarTrack axis="y">
      <ScrollbarThumb axis="y" />
    </ScrollbarTrack>
  </ScrollbarBar>
</div>
