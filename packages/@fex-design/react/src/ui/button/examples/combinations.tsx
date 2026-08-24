import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button } from '@fex-design/react/ui/button'

export function CombinationsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
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
