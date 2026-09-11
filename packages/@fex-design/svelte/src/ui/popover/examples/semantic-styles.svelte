<script lang="ts">
  import { buttonClassName } from '@fex-design/styles/button';
  import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types';
  import { Popover } from '@fex-design/svelte/ui/popover';
  import { Button } from '@fex-design/svelte/ui/button';
  type DemoCase = { label: string; options: PopoverOptions }
const cases = [{ label: '按部位自定义样式', options: { arrow: true } }]

</script>
<div class="w-full flex items-center justify-center min-h-[360px] py-16">

<div class="grid gap-4">
  
  
  <div class="flex flex-wrap gap-3">
    {#each cases as item (item.label)}
      <div>
        <Popover {...item.options} title="提示信息"
          classNames={{ title: 'text-blue-700 font-semibold', content: 'text-sm' }}
          styles={{ root: '--popover-background: var(--muted-background); --popover-border: var(--color-blue-500); --popover-radius: 12px; --popover-arrow-size: 16px' }}>
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
