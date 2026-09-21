<script lang="ts">
  import { buttonClassName } from "@fex-design/components-styles/button";
  import type {
    FloatingPlacement,
    PopoverOptions,
  } from "@fex-design/core/popover/types";
  import { Popover } from "@fex-design/svelte/ui/popover";
  import { Button } from "@fex-design/svelte/ui/button";
  type DemoCase = { label: string; options: PopoverOptions };
  const cases = [{ label: "打开浮层", options: {} }];
</script>

<div class="w-full flex items-center justify-center min-h-[360px] py-16">
  <div class="grid gap-4">
    <div class="flex flex-wrap gap-3">
      {#each cases as item (item.label)}
        <div>
          <Popover {...item.options} title="提示信息">
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
            {#snippet content(state)}
              <p>这里可以放置说明和交互内容。</p>
            {/snippet}
          </Popover>
        </div>
      {/each}
    </div>
  </div>
</div>
