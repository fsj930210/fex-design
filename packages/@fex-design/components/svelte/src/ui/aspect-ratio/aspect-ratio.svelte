<script lang="ts">
  import type { AspectRatioOptions } from "@fex-design/core/aspect-ratio/types";
  import AspectRatio from '@fex-design/svelte/primitive/aspect-ratio/aspect-ratio.svelte';
  let { ratio, ...props } = $props<AspectRatioOptions>();
</script>

<AspectRatio {ratio} {...props} />
