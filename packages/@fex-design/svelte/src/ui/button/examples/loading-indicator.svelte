<script lang="ts">
  import { Button } from '@fex-design/svelte/ui/button'
</script>

<div class="flex flex-wrap items-center gap-3">{#snippet loadingIndicator()}<span class="animate-pulse">•••</span>{/snippet}<Button loading {loadingIndicator}>Uploading</Button>
</div>
