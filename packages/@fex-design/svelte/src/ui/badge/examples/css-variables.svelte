<script lang="ts">
  import { Badge } from '@fex-design/svelte/ui/badge'
</script>

<div class="flex items-center gap-4">
  <Badge
    count={8}
    class="[--badge-color:#7c3aed] [--badge-font-size:0.875rem] [--badge-height:2rem] [--badge-min-width:2rem] [--badge-padding-inline:0.5rem]"
  />
  <Badge dot class="[--badge-color:#0ea5e9] [--badge-dot-size:0.75rem]" />
</div>
