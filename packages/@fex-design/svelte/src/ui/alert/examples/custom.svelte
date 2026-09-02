<script lang="ts">
  import { Alert } from '@fex-design/svelte/ui/alert'
  import StarIcon from '../../../icon/star.svelte'
</script>
<div class="w-full max-w-sm"><Alert type="success" showIcon closable title={title} icon={icon} action={action} /></div>
{#snippet title()}Long alert title wraps to multiple lines when the alert container is narrow enough.{/snippet}
{#snippet icon()}<StarIcon />{/snippet}
{#snippet action()}<button class="underline">Action</button>{/snippet}
