<script lang="ts">
  import { buttonClassName } from '@fex-design/styles/button';
  import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types';
  import { Popover } from '@fex-design/svelte/ui/popover';
  import { Button } from '@fex-design/svelte/ui/button';
  type DemoCase = { label: string; options: PopoverOptions }
const placements: FloatingPlacement[] = [
  'topLeft', 'top', 'topRight', 'leftTop', 'rightTop', 'left',
  'right', 'leftBottom', 'rightBottom', 'bottomLeft', 'bottom', 'bottomRight',
]
const cells = ['1 / 2', '1 / 3', '1 / 4', '2 / 1', '2 / 5', '3 / 1', '3 / 5', '4 / 1', '4 / 5', '5 / 2', '5 / 3', '5 / 4']
const cases = placements.map((placement, index) => ({
  label: placement, options: { placement, arrow: true, avoidCollisions: false }, cell: cells[index],
}))

</script>
<div class="w-full flex items-center justify-center min-h-[600px] py-16">

<div class="grid w-full gap-4">
  
  
  <div class="grid grid-cols-[repeat(5,5rem)] grid-rows-[repeat(5,2.25rem)] justify-center gap-3 px-8 py-28 [&_button]:h-9 [&_button]:w-20 [&_button]:justify-center [&_button]:px-2">
    {#each cases as item (item.label)}
      <div style:grid-area={item.cell}>
        <Popover {...item.options} title="提示信息">
          {#snippet children({ action, props })}
                <button use:action {...props} class={buttonClassName()} data-slot="button" data-variant="outlined" data-size="md">{item.label}</button>
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
