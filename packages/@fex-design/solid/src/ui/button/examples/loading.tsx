import { Button } from '@fex-design/solid/ui/button'

export function LoadingExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <Button loading>Saving</Button>
      <Button loading iconPlacement="end">
        Publishing
      </Button>
      <Button loading variant="outline">
        Loading
      </Button>
    </div>
  )
}
