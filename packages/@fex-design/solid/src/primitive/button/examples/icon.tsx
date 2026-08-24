import { PlusIcon } from '@fex-design/solid/icon/plus'
import { Button, ButtonIcon } from '@fex-design/solid/primitive/button'

export function IconExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
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
