<script lang="ts">
  import TooltipRoot from "@fex-design/svelte/primitive/tooltip";
  import TooltipTrigger from "@fex-design/svelte/primitive/tooltip-trigger";
  import TooltipPortal from "@fex-design/svelte/primitive/tooltip-portal";
  import TooltipContent from "@fex-design/svelte/primitive/tooltip-content";
  import TooltipArrow from "@fex-design/svelte/primitive/tooltip-arrow";
  import { buttonClassName } from "@fex-design/components-styles/button";
  import type { FloatingPlacement } from "@fex-design/core/floating/placement";
  const placements: FloatingPlacement[] = [
    "topLeft",
    "top",
    "topRight",
    "leftTop",
    "rightTop",
    "left",
    "right",
    "leftBottom",
    "rightBottom",
    "bottomLeft",
    "bottom",
    "bottomRight",
  ];
  const cells = [
    "1 / 2",
    "1 / 3",
    "1 / 4",
    "2 / 1",
    "2 / 5",
    "3 / 1",
    "3 / 5",
    "4 / 1",
    "4 / 5",
    "5 / 2",
    "5 / 3",
    "5 / 4",
  ];
  const cases = placements.map((placement, index) => ({
    placement,
    cell: cells[index],
  }));
</script>

<div class="w-full flex items-center justify-center min-h-[600px] py-16">
  <div class="grid w-full gap-4 overflow-visible">
    <p>
      四个方向 × 三种对齐，共 12
      个位置；本例关闭自动避让，浮层始终保持所选方向。
    </p>
    <div
      class="grid grid-cols-[repeat(5,5rem)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 px-8 py-28 [&_button]:h-9 [&_button]:w-20 [&_button]:justify-center [&_button]:px-2"
    >
      {#each cases as item (item.placement)}<div style:grid-area={item.cell}>
          <TooltipRoot placement={item.placement} avoidCollisions={false}
            ><TooltipTrigger
              >{#snippet children(binding)}<button
                  {...binding.props}
                  use:binding.action
                  class={buttonClassName({ variant: "outlined" })}
                  >{item.placement}</button
                >{/snippet}</TooltipTrigger
            ><TooltipPortal
              ><TooltipContent>{item.placement}<TooltipArrow /></TooltipContent
              ></TooltipPortal
            ></TooltipRoot
          >
        </div>{/each}
    </div>
  </div>
</div>
