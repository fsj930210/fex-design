<script lang="ts">
import Separator from '../separator.svelte'
const items = [['Workspace', 'Fex Design'], ['Plan', 'Team'], ['Region', 'Asia Pacific']]
</script>
<div class="grid w-full max-w-lg">{#each items as [label, value], index (label)}<div><div class="flex justify-between py-2"><span>{label}</span><span class="text-muted-foreground">{value}</span></div>{#if index < items.length - 1}<Separator/>{/if}</div>{/each}</div>
