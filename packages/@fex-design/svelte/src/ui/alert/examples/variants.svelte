<script lang="ts">
  import { Alert } from '@fex-design/svelte/ui/alert'
</script>

<div class="grid w-full gap-3">
  <Alert variant="filled" showIcon title={filled} />
  <Alert variant="outlined" showIcon title={outlined} />
  <Alert variant="solid" showIcon title={solid} />
</div>

{#snippet filled()}Filled Alert{/snippet}
{#snippet outlined()}Outlined Alert{/snippet}
{#snippet solid()}Solid Alert{/snippet}
