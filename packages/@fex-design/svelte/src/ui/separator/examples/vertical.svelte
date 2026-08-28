<script lang="ts">
import Separator from '../../../primitive/separator/separator.svelte'
import Card from '@fex-design/svelte/ui/card'
</script>
<Card title="Vertical" description="Use vertical separators between compact inline items."><div class="flex h-5 items-center gap-2"><span>Blog</span><Separator orientation="vertical"/><span>Docs</span><Separator orientation="vertical"/><span>Source</span></div></Card>
