<script lang="ts">
import Separator from '../separator.svelte'
import Card from '@fex-design/svelte/ui/card'
const items = [['Workspace', 'Fex Design'], ['Plan', 'Team'], ['Region', 'Asia Pacific']]
</script>
<Card title="List" description="Place separators between rows, not after the final item."><div class="grid max-w-lg">{#each items as [label, value], index (label)}<div><div class="flex justify-between py-2"><span>{label}</span><span class="text-muted-foreground">{value}</span></div>{#if index < items.length - 1}<Separator/>{/if}</div>{/each}</div></Card>
