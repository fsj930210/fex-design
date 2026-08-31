import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button, ButtonIcon } from '@fex-design/react/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

export function IconsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button className={buttonClassName()}>
        <ButtonIcon>
          <PlusIcon />
        </ButtonIcon>
        Create
      </Button>
      <Button className={buttonClassName()}>
        Continue
        <ButtonIcon placement="end">
          <PlusIcon />
        </ButtonIcon>
      </Button>
      <Button className={buttonClassName({ size: 'icon' })} aria-label="Create">
        <ButtonIcon>
          <PlusIcon />
        </ButtonIcon>
      </Button>
    </div>
  )
}
