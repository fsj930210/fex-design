import { PlusIcon } from '@fex-design/solid/icons/plus'
import { Button } from '@fex-design/solid/ui/button'

export function IconsExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <Button icon={<PlusIcon />}>Create</Button>
      <Button icon={<PlusIcon />} iconPlacement="end">
        Continue
      </Button>
      <Button icon={<PlusIcon />} size="icon-md" aria-label="Create" />
    </div>
  )
}
