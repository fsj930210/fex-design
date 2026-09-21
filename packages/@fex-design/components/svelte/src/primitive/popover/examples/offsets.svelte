<script lang="ts">
  import { buttonClassName } from "@fex-design/components-styles/button";
  import type {
    FloatingPlacement,
    PopoverOptions,
  } from "@fex-design/core/popover/types";
  import {
    Popover,
    PopoverTrigger,
    PopoverPortal,
    PopoverContent,
    PopoverArrow,
    PopoverHeader,
    PopoverTitle,
  } from "@fex-design/svelte/primitive/popover";
  import { Button } from "@fex-design/svelte/primitive/button";
  type DemoCase = { label: string; options: PopoverOptions };
  let sideOffset = $state(12);
  let alignOffset = $state(0);
  const cases = $derived<DemoCase[]>(
    (["start", "center", "end"] as const).map((align) => ({
      label: align,
      options: {
        side: "bottom",
        align,
        arrow: true,
        avoidCollisions: false,
        sideOffset: sideOffset,
        alignOffset: alignOffset,
      },
    })),
  );
</script>

<div class="w-full flex items-center justify-center min-h-[480px] py-16">
  <div class="grid gap-4">
    <label
      >浮层与触发元素距离 {sideOffset}px
      <input type="range" min="0" max="40" bind:value={sideOffset} /></label
    >
    <label
      >面板与触发元素对齐偏移 {alignOffset}px
      <input type="range" min="-40" max="40" bind:value={alignOffset} /></label
    >
    <div class="flex flex-wrap justify-center gap-16 pt-12 pb-24">
      {#each cases as item (item.label)}
        <div>
          <Popover {...item.options}>
            {#snippet children(state)}
              <PopoverTrigger>
                {#snippet children({ action, props })}
                  <button
                    use:action
                    {...props}
                    class={buttonClassName()}
                    data-slot="button"
                    data-variant="outlined"
                    data-size="md">{item.label}</button
                  >
                {/snippet}
              </PopoverTrigger>
              <PopoverPortal>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverHeader
                    ><PopoverTitle>提示信息</PopoverTitle></PopoverHeader
                  >
                  <p>这里可以放置说明和交互内容。</p>
                </PopoverContent>
              </PopoverPortal>
            {/snippet}
          </Popover>
        </div>
      {/each}
    </div>
  </div>
</div>
