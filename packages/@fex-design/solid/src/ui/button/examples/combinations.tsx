import { PlusIcon } from '@fex-design/solid/icon/plus'
import { Button } from '@fex-design/solid/ui/button'

export function CombinationsExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <div dir="ltr">
        <Button variant="destructive" size="lg" effect="press" icon={<PlusIcon />}>
          Delete
        </Button>
      </div>
      <div dir="rtl">
        <Button variant="outline" effect="expand-icon" icon={<PlusIcon />} iconPlacement="end">
          متابعة
        </Button>
      </div>
    </div>
  )
}
