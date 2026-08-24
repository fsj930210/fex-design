import { PlusIcon } from '@fex-design/solid/icon/plus'
import { Button } from '@fex-design/solid/ui/button'

export function IconsExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <Button icon={<PlusIcon />}>Create</Button>
      <Button icon={<PlusIcon />} iconPlacement="end">
        Continue
      </Button>
      <Button icon={<PlusIcon />} size="icon" aria-label="Create" />
    </div>
  )
}
