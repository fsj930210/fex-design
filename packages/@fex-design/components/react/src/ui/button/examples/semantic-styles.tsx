import { Button } from '@fex-design/react/ui/button'

export function ButtonSemanticStylesExample() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button
        loading
        iconPlacement="start"
        startIconProps={{ className: 'rounded bg-violet-100 p-0.5' }}
        loadingIconProps={{ className: 'text-violet-700' }}
      >
        Start
      </Button>
      <Button
        loading
        iconPlacement="end"
        endIconProps={{ className: 'rounded bg-cyan-100 p-0.5' }}
        loadingIconProps={{ className: 'text-cyan-700' }}
      >
        End
      </Button>
    </div>
  )
}
