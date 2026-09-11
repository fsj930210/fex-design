<script lang="ts">
  import { Badge } from "@fex-design/svelte/ui/badge";
  import { SwitchRoot, SwitchThumb } from '@fex-design/svelte/primitive/switch'
  let showZero = $state(false);
</script>

<div class="flex items-center gap-6">
  <label class="flex items-center gap-2"
    ><SwitchRoot
      checked={showZero}
      aria-label="显示 0"
      onChange={(value) => (showZero = value)}
      >{#snippet children()}<SwitchThumb />{/snippet}</SwitchRoot
    ><span>显示 0</span></label
  ><Badge count={0} {showZero}
    ><span class="block size-10 rounded bg-muted-background"></span></Badge
  >
</div>
