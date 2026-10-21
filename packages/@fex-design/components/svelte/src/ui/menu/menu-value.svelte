<script lang="ts">
  import type { MenuContentValue } from "./types";
  let { value }: { value?: MenuContentValue } = $props();
</script>

{#if typeof value === "function"}{@render value()}{:else}{value === false
    ? ""
    : (value ?? "")}{/if}
