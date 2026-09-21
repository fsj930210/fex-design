<script lang="ts">
  import { mentionsListClassName } from "@fex-design/components-styles/mentions";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import ListboxRoot from "../listbox/listbox.svelte";
  import { useMentions } from "./context";

  let { class: className, children }: { class?: string; children?: Snippet } =
    $props();
  const mentions = useMentions("MentionsList");
</script>

<ListboxRoot
  id={mentions.listId}
  value={mentions.snapshot().activeKey}
  class={cn(mentionsListClassName, className)}
  onChange={(value) =>
    mentions.controller.setActiveKey(Array.isArray(value) ? value[0] : value)}
>
  {@render children?.()}
</ListboxRoot>
