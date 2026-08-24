import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button, ButtonGroup, ButtonIcon } from '@fex-design/react/primitive/button'

export function CompositionExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonGroup spacing={8}>
        <Button>
          <ButtonIcon placement="start">
            <PlusIcon />
          </ButtonIcon>
          Add
        </Button>
        <Button aria-pressed="true">Selected</Button>
        <Button disabled>Disabled</Button>
      </ButtonGroup>
    </div>
  )
}
