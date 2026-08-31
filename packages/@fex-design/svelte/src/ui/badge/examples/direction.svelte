<script lang="ts">import { Badge } from '@fex-design/svelte/ui/badge';const directions=['ltr','rtl'] as const</script>
<div class="flex items-center justify-center gap-12">{#each directions as dir}<div {dir} class="grid justify-items-center gap-2"><span>{dir.toUpperCase()}</span><Badge count={5}><span class="block size-10 rounded bg-muted-background"></span></Badge></div>{/each}</div>
