<script lang="ts">
  import { cascaderLoadingClassName } from "@fex-design/components-styles/cascader";
  import type { Snippet } from "svelte";
  import LoadingIcon from '@fex-design/svelte/icons/loading.svelte';
  let { children }: { children?: Snippet } = $props();
</script>

<div class={cascaderLoadingClassName}>
  <LoadingIcon
    class="animate-spin"
  />{#if children}{@render children()}{:else}Loading...{/if}
</div>
