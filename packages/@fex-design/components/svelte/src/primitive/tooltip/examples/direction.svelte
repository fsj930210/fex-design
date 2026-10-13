<script lang="ts">
  import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from "@fex-design/svelte/primitive/tooltip";
  import { buttonClassName } from "@fex-design/components-styles/button";
</script>

<div class="grid gap-6 sm:grid-cols-2">
  <div class="flex justify-center" dir="ltr">
    <TooltipRoot placement="topLeft" avoidCollisions={false}
      ><TooltipTrigger
        >{#snippet children(binding)}<button
            {...binding.props}
            use:binding.action
            class={buttonClassName()}>查看中文提示</button
          >{/snippet}</TooltipTrigger
      ><TooltipPortal
        ><TooltipContent dir="ltr"
          >这是从起始侧对齐的中文提示<TooltipArrow /></TooltipContent
        ></TooltipPortal
      ></TooltipRoot
    >
  </div>
  <div class="flex justify-center" dir="rtl">
    <TooltipRoot placement="topLeft" avoidCollisions={false}
      ><TooltipTrigger
        >{#snippet children(binding)}<button
            {...binding.props}
            use:binding.action
            class={buttonClassName()}>تلميح</button
          >{/snippet}</TooltipTrigger
      ><TooltipPortal
        ><TooltipContent dir="rtl"
          >تلميح عربي بمحاذاة جهة البداية<TooltipArrow /></TooltipContent
        ></TooltipPortal
      ></TooltipRoot
    >
  </div>
</div>
