<script lang="ts">import { SkeletonButton, SkeletonText } from '@fex-design/svelte/primitive/skeleton'</script>
<div class="grid min-w-[32rem] grid-cols-[1.2fr_1fr_6rem] gap-x-6 gap-y-4">{#each Array(12) as _, index}{#if index % 3 === 2}<SkeletonButton size="sm" class="w-16" />{:else}<SkeletonText class={index < 3 ? 'w-2/3' : undefined} />{/if}{/each}</div>

