import { PlusIcon } from '@fex-design/solid/icon/plus'
import { Button, ButtonIcon } from '@fex-design/solid/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

export function CombinationsExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <div dir="ltr">
        <Button
          class={buttonClassName({
            variant: 'solid',
            color: 'danger',
            size: 'lg',
            effect: 'press',
          })}
          variant="solid"
          color="danger"
          data-effect="press"
        >
          <ButtonIcon placement="start">
            <PlusIcon />
          </ButtonIcon>
          Delete
        </Button>
      </div>
      <div dir="rtl">
        <Button
          class={buttonClassName({ variant: 'outlined', effect: 'expand-icon' })}
          variant="outlined"
          data-effect="expand-icon"
        >
          متابعة
          <ButtonIcon placement="end">
            <PlusIcon />
          </ButtonIcon>
        </Button>
      </div>
    </div>
  )
}
