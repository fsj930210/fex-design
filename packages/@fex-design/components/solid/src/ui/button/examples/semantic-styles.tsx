import { Button } from '@fex-design/solid/ui/button'

export function ButtonSemanticStylesExample() {
  return (
    <div class="flex flex-wrap gap-4">
      <Button
        loading
        iconPlacement="start"
        startIconProps={{ class: 'rounded bg-violet-100 p-0.5' }}
        loadingIconProps={{ class: 'text-violet-700' }}
      >
        Start
      </Button>
      <Button
        loading
        iconPlacement="end"
        endIconProps={{ class: 'rounded bg-cyan-100 p-0.5' }}
        loadingIconProps={{ class: 'text-cyan-700' }}
      >
        End
      </Button>
    </div>
  )
}
