import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button } from '@fex-design/react/ui/button'

export function IconsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={<PlusIcon />}>Create</Button>
      <Button icon={<PlusIcon />} iconPlacement="end">
        Continue
      </Button>
      <Button icon={<PlusIcon />} size="icon" aria-label="Create" />
    </div>
  )
}
