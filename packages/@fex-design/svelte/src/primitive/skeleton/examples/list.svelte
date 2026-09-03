<script lang="ts">import { SkeletonAvatar, SkeletonText } from '@fex-design/svelte/primitive/skeleton'</script>
<div class="grid w-full max-w-xl gap-5">{#each [0,1,2] as item (item)}<div class="flex items-start gap-3"><SkeletonAvatar size="lg" /><div class="grid min-w-0 flex-1 gap-2"><SkeletonText class="w-2/5" /><SkeletonText /><SkeletonText class="w-4/5" /></div></div>{/each}</div>
