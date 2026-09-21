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
  const cases = [{ label: "打开浮层", options: {} }];
</script>

<div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-3">
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
