<script lang="ts">import { selectGroupLabelClassName } from "@fex-design/styles/select"; import type { Snippet } from "svelte"; let { children }: { children?: Snippet } = $props();</script>
<div class={selectGroupLabelClassName}>{@render children?.()}</div>
