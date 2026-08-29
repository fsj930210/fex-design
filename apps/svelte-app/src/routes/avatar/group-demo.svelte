<script lang="ts">
  import { Avatar, AvatarGroup } from '@fex-design/svelte/ui/avatar'
  import Card from '@fex-design/svelte/ui/card'
  const names = ['AM', 'BL', 'CS', 'DT', 'ER']
</script>
{#snippet avatar(name: string)}<Avatar>{name}</Avatar>{/snippet}
<Card title="Avatar group" description="Keep the first avatars visible and summarize the rest."><AvatarGroup items={names} maxCount={3} item={avatar} /></Card>
