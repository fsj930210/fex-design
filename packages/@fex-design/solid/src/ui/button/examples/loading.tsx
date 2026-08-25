import { Button } from '@fex-design/solid/ui/button'

export function LoadingExample() {
  return (
    <div class="grid gap-4">
      <div class="grid grid-cols-[7rem_1fr] items-center gap-4">
        <span class="text-sm font-medium">内置加载图标</span>
        <div class="flex flex-wrap items-center gap-3">
          <Button loading>Saving</Button>
          <Button loading iconPlacement="end">
            Publishing
          </Button>
          <Button loading variant="outlined">
            Loading
          </Button>
        </div>
      </div>
      <div class="grid grid-cols-[7rem_1fr] items-center gap-4">
        <span class="text-sm font-medium">自定义加载图标</span>
        <Button class="w-fit" loading loadingIndicator={<span class="animate-pulse">•••</span>}>
          Uploading
        </Button>
      </div>
    </div>
  )
}
