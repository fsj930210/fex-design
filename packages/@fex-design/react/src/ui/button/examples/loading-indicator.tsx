import { Button } from '@fex-design/react/ui/button'

export function LoadingIndicatorExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button loading loadingIndicator={<span className="animate-pulse">•••</span>}>
        Uploading
      </Button>
    </div>
  )
}
