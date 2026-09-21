import { Button } from '@fex-design/react/ui/button'

export function LoadingExample() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[7rem_1fr] items-center gap-4">
        <span className="text-sm font-medium">内置加载图标</span>
        <div className="flex flex-wrap items-center gap-3">
          <Button loading>Saving</Button>
          <Button loading iconPlacement="end">
            Publishing
          </Button>
          <Button loading variant="outlined">
            Loading
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[7rem_1fr] items-center gap-4">
        <span className="text-sm font-medium">自定义加载图标</span>
        <Button
          className="w-fit"
          loading
          loadingIndicator={<span className="animate-pulse">•••</span>}
        >
          Uploading
        </Button>
      </div>
    </div>
  )
}
