<script lang="ts">
  import { Button, ButtonIcon } from '@fex-design/svelte/primitive/button'
  import LoadingIcon from '@fex-design/svelte/icon/loading'
  import { buttonSpinnerClassName } from '@fex-design/styles/button'
</script>

<div class="grid gap-4">
  <div class="grid grid-cols-[7rem_1fr] items-center gap-4">
    <span class="text-sm font-medium">内置加载图标</span>
    <div class="flex flex-wrap items-center gap-3">
      <Button disabled data-loading="true">
        <ButtonIcon><LoadingIcon class={buttonSpinnerClassName} /></ButtonIcon>
        Saving
      </Button>
      <Button disabled data-loading="true">
        Publishing
        <ButtonIcon placement="end"><LoadingIcon class={buttonSpinnerClassName} /></ButtonIcon>
      </Button>
      <Button variant="outlined" disabled data-loading="true">
        <ButtonIcon><LoadingIcon class={buttonSpinnerClassName} /></ButtonIcon>
        Loading
      </Button>
    </div>
  </div>
  <div class="grid grid-cols-[7rem_1fr] items-center gap-4">
    <span class="text-sm font-medium">自定义加载图标</span>
    <Button class="w-fit" disabled data-loading="true">
      <ButtonIcon><span class="animate-pulse">•••</span></ButtonIcon>
      Uploading
    </Button>
  </div>
</div>
