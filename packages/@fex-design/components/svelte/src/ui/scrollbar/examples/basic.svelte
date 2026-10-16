<script lang="ts">
  import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
  import { Scrollbar } from '@fex-design/svelte/ui/scrollbar';
</script>
<Scrollbar class="h-48 w-72 rounded-md border" autoHide="never" overflow={{ x: 'hidden' }} viewportProps={{ overflow: { y: 'auto' } }}>
  <div class="grid gap-3 p-4">
        {#each scrollbarDemoLines as line (line)}<p>{line}</p>{/each}
      </div>
</Scrollbar>
