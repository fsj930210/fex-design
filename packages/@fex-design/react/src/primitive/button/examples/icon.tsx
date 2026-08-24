import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button, ButtonIcon } from '@fex-design/react/primitive/button'

export function IconExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <ButtonIcon placement="start">
          <PlusIcon />
        </ButtonIcon>
        New item
      </Button>
      <Button>
        Next
        <ButtonIcon placement="end">
          <PlusIcon />
        </ButtonIcon>
      </Button>
    </div>
  )
}
