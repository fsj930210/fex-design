<script lang="ts">
  import { mentionsContentClassName } from "@fex-design/components-styles/mentions";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import { useMentions } from "./context";

  let { class: className, children }: { class?: string; children?: Snippet } =
    $props();
  const mentions = useMentions("MentionsContent");
</script>

{#if mentions.snapshot().open && mentions.snapshot().query}
  <div
    data-slot="mentions-content"
    class={cn(
      mentionsContentClassName,
      "absolute left-0 top-full mt-1 min-w-64",
      className,
    )}
  >
    {@render children?.()}
  </div>
{/if}
