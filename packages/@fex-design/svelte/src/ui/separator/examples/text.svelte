<script lang="ts">
import Separator from '../../../primitive/separator/separator.svelte'
import Card from '@fex-design/svelte/ui/card'
</script>
<Card title="With Text" description="Compose a label between two separators and control its placement."><div class="grid max-w-xl gap-4"><div class="flex items-center gap-2"><Separator class="w-12"/><span class="shrink-0 text-sm text-muted-foreground">Start</span><Separator class="flex-1"/></div><div class="flex items-center gap-2"><Separator class="flex-1"/><span class="shrink-0 text-sm text-muted-foreground">Center</span><Separator class="flex-1"/></div><div class="flex items-center gap-2"><Separator class="flex-1"/><span class="shrink-0 text-sm text-muted-foreground">End</span><Separator class="w-12"/></div></div></Card>
