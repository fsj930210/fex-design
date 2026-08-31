<script lang="ts">
  import { Badge, BadgeGroup } from '@fex-design/svelte/ui/badge'
  const items = ['Vue', 'React', 'Solid', 'Svelte', 'Angular']
</script>
<BadgeGroup {items} maxCount={3}>{#snippet item(value)}<Badge color="info">{value}</Badge>{/snippet}</BadgeGroup>
