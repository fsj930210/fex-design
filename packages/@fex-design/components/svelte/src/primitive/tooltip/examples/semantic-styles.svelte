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
          class={buttonClassName()}>查看结构化样式</button
        >{/snippet}</TooltipTrigger
    ><TooltipPortal
      ><TooltipContent
        class="rounded-2xl font-semibold shadow-xl"
        style="background-color:#7c3aed;color:#fff;font-size:16px;line-height:24px;max-width:260px;padding:12px 20px"
        >这是明显放大的紫色结构化提示<TooltipArrow
          class="rounded-[3px]"
          style="background-color:#7c3aed;width:12px;height:12px"
        /></TooltipContent
      ></TooltipPortal
    ></TooltipRoot
  >
</div>
