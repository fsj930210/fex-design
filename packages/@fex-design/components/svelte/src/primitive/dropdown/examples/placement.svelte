<script lang="ts">
  import {
    DropdownRoot,
    DropdownTrigger,
    DropdownPortal,
    DropdownContent,
  } from "@fex-design/svelte/primitive/dropdown";
  import { MenuItem } from "@fex-design/svelte/primitive/menu";
  import { buttonClassName } from "@fex-design/components-styles/button";
  const placements = [
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
  ] as const;
  const positions = [
    "col-start-2 row-start-1",
    "col-start-3 row-start-1",
    "col-start-4 row-start-1",
    "col-start-1 row-start-2",
    "col-start-5 row-start-2",
    "col-start-1 row-start-3",
    "col-start-5 row-start-3",
    "col-start-1 row-start-4",
    "col-start-5 row-start-4",
    "col-start-2 row-start-5",
    "col-start-3 row-start-5",
    "col-start-4 row-start-5",
  ];
</script>

<div class="grid w-full gap-4 p-6">
  <p>四个方向、三种对齐；关闭自动避让以展示所选位置。</p>
  <div
    class="grid grid-cols-[repeat(5,max-content)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 py-28"
  >
    {#each placements as placement, index (placement)}
      <div class={positions[index]}>
        <DropdownRoot popoverProps={{ placement, avoidCollisions: false }}>
          <DropdownTrigger
            >{#snippet children({ action, props })}<button
                use:action
                {...props}
                class={buttonClassName({ className: "px-2" })}
                >{placement}</button
              >{/snippet}</DropdownTrigger
          >
          <DropdownPortal
            ><DropdownContent
              ><MenuItem value="rename">重命名</MenuItem><MenuItem value="copy"
                >复制</MenuItem
              ></DropdownContent
            ></DropdownPortal
          >
        </DropdownRoot>
      </div>
    {/each}
  </div>
</div>
