import { Button } from '@fex-design/solid/ui/button'

export function LoadingIndicatorExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <Button loading loadingIndicator={<span class="animate-pulse">•••</span>}>
        Uploading
      </Button>
    </div>
  )
}
