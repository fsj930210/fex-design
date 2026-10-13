<script lang="ts">
  import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow } from "@fex-design/svelte/primitive/tooltip";
  import { buttonClassName } from "@fex-design/components-styles/button";
  const colors = [
    { label: "品牌蓝", value: "#1677ff" },
    { label: "紫色", value: "#722ed1" },
    { label: "暖红色", value: "#d4380d" },
  ];
</script>

<div class="flex flex-wrap items-center justify-center gap-4">
  {#each colors as item (item.value)}<TooltipRoot
      ><TooltipTrigger
        >{#snippet children(binding)}<button
            {...binding.props}
            use:binding.action
            class={buttonClassName()}>{item.label}</button
          >{/snippet}</TooltipTrigger
      ><TooltipPortal
        ><TooltipContent color={item.value}
          >{item.label} Tooltip<TooltipArrow /></TooltipContent
        ></TooltipPortal
      ></TooltipRoot
    >{/each}
</div>
