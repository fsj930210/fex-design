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
  let container = $state<HTMLDivElement | null>(null);
  const cases = [
    { label: "挂载到 body", options: {} },
    {
      label: "在框内打开浮层",
      options: {
        getPopupContainer: () => container ?? document.body,
      },
    },
  ] satisfies DemoCase[];
</script>

<div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <div class="grid w-full gap-4">
    <div
      bind:this={container}
      class="relative w-full h-96 overflow-auto rounded-lg border-2 border-dashed p-6"
    >
      <p>自定义挂载区域：浮层插入此虚线框，仍以按钮为定位参照。</p>
      <div class="flex min-h-[560px] justify-center gap-4 pt-24">
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
</div>
