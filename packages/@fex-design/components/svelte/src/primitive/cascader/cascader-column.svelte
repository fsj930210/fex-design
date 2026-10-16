<script lang="ts">
  import {
    cascaderColumnClassName,
    cascaderColumnViewportClassName,
  } from "@fex-design/components-styles/cascader";
  import { cn } from "@fex-design/utils";
  import type { Snippet } from "svelte";
  import { ScrollbarRoot, ScrollbarBar, ScrollbarViewport, ScrollbarTrack, ScrollbarThumb } from '../scrollbar';
  let { class: className, children }: { class?: string; children?: Snippet } =
    $props();
</script>

<div role="listbox" class={cn(cascaderColumnClassName, className)}>
  <ScrollbarRoot class="h-full"
    ><ScrollbarViewport
      overflow={{ x: 'hidden', y: 'auto' }}
      class={cascaderColumnViewportClassName}
      >{@render children?.()}</ScrollbarViewport
    ><ScrollbarBar axis="y">
      <ScrollbarTrack axis="y">
        <ScrollbarThumb axis="y" />
      </ScrollbarTrack>
    </ScrollbarBar></ScrollbarRoot
  >
</div>
