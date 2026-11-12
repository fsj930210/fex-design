<script lang="ts">
  import type { Snippet } from "svelte";
  import type { AnyFieldApi } from "@tanstack/svelte-form";
  import { provideField } from "./context";
  let {
    field,
    association,
    children,
  }: { field: AnyFieldApi; association: any; children?: Snippet } = $props();
  provideField({
    get field() {
      return field;
    },
    get association() {
      return association;
    },
  });
</script>

{@render children?.()}
