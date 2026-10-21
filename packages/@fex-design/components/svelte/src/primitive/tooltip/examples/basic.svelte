<script lang="ts">
  import {
    TooltipRoot,
    TooltipTrigger,
    TooltipPortal,
    TooltipContent,
    TooltipArrow,
  } from "@fex-design/svelte/primitive/tooltip";
  import { buttonClassName } from "@fex-design/components-styles/button";
</script>

<div class="flex min-h-64 items-center justify-center">
  <TooltipRoot
    ><TooltipTrigger
      >{#snippet children(binding)}<button
          {...binding.props}
          use:binding.action
          class={buttonClassName()}>悬停或聚焦</button
        >{/snippet}</TooltipTrigger
    ><TooltipPortal
      ><TooltipContent
        >将鼠标移到这段提示上仍会保持显示<TooltipArrow /></TooltipContent
      ></TooltipPortal
    ></TooltipRoot
  >
</div>
