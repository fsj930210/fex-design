<script lang="ts">
  import TooltipRoot from "@fex-design/svelte/primitive/tooltip";
  import TooltipTrigger from "@fex-design/svelte/primitive/tooltip-trigger";
  import TooltipPortal from "@fex-design/svelte/primitive/tooltip-portal";
  import TooltipContent from "@fex-design/svelte/primitive/tooltip-content";
  import TooltipArrow from "@fex-design/svelte/primitive/tooltip-arrow";
  import { buttonClassName } from "@fex-design/styles/button";
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
