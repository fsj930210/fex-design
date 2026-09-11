<script lang="ts">
  import { buttonClassName } from '@fex-design/styles/button';
  import type { FloatingPlacement, PopoverOptions } from '@fex-design/core/popover/types';
  import { Popover } from '@fex-design/svelte/ui/popover';
  import { Button } from '@fex-design/svelte/ui/button';
  type DemoCase = { label: string; options: PopoverOptions }
let open = $state(false)
const cases = $derived<DemoCase[]>( [
  { label: '受控表单', options: { open: open, onOpenChange: (next) => { open = next } } },
  { label: '非受控：关闭保留草稿', options: {} },
  { label: '关闭销毁：重新填写', options: { destroyOnHidden: true } },
  { label: '提前挂载，关闭保留', options: { lazyMount: false } },
  { label: '提前挂载，关闭销毁', options: { lazyMount: false, destroyOnHidden: true } },
])

</script>
<div class="w-full flex items-center justify-center min-h-[360px] py-16">

<div class="grid gap-4">
  <Button onclick={() => open = !open}>外部切换：{open ? '打开' : '关闭'}</Button>
  
  <div class="flex flex-wrap gap-3">
    {#each cases as item (item.label)}
      <div>
        <Popover {...item.options} title={item.label}>
          {#snippet children({ action, props })}
                <button use:action {...props} class={buttonClassName()} data-slot="button" data-variant="outlined" data-size="md">{item.label}</button>
              {/snippet}
          {#snippet content(state)}
            <div class="grid gap-3">
                <label>备注<input aria-label="备注" class="block rounded border p-2" placeholder="关闭后再打开检查草稿" /></label>
                <Button onclick={() => state.close()}>在浮层内关闭</Button>
              </div>
          {/snippet}
        </Popover>
      </div>
    {/each}
    
  </div>
</div>

</div>
