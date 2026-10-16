<script lang="ts">
  import { onMount } from 'svelte';
  import { Scrollbar } from '@fex-design/svelte/ui/scrollbar';
  import { scrollbarColumns, scrollbarRows, observeScrollbarHeader } from '@fex-design/docs-shared/scrollbar-demo';
  let root = $state<HTMLDivElement>();
  let header = $state<HTMLTableSectionElement>();
  onMount(() => { if (root && header) return observeScrollbarHeader(root, header); });
</script>
<Scrollbar bind:element={root} class="h-64 w-full max-w-xl rounded-md border" autoHide="never" styles={{ barY: "top:var(--table-header-height)" }} viewportProps={{ role: "region", "aria-label": "Orders", tabindex: 0 }}>
  <table class="w-full min-w-[900px] table-fixed border-separate border-spacing-0 text-left text-sm">
    <thead bind:this={header} class="sticky top-0 z-10 bg-background"><tr>{#each scrollbarColumns as column (column)}<th scope="col" class="border-b px-4 py-3">{column}</th>{/each}</tr></thead>
    <tbody>{#each scrollbarRows as row (row.id)}<tr><td class="border-b px-4 py-3">{row.id}</td><td class="border-b px-4 py-3">{row.customer}</td><td class="border-b px-4 py-3">{row.address}</td><td class="border-b px-4 py-3">{row.status}</td><td class="border-b px-4 py-3">{row.amount}</td></tr>{/each}</tbody>
  </table>
</Scrollbar>
