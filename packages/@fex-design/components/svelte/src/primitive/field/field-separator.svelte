<script lang="ts">
  import { fieldSeparatorClassName } from "@fex-design/components-styles/field";
  import { cn } from "@fex-design/utils";
  import type { HTMLAttributes } from "svelte/elements";
  let { class: className, ...rest }: HTMLAttributes<HTMLDivElement> = $props();
</script>

<div
  {...rest}
  role={rest.role ?? "separator"}
  data-slot="field-separator"
  class={cn(fieldSeparatorClassName, className)}
></div>
