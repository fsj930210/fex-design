import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button, ButtonGroup, ButtonIcon } from '@fex-design/react/primitive/button'

export function DirectionExample() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {(['ltr', 'rtl'] as const).map((direction) => (
        <section key={direction} className="grid gap-3 rounded-lg border p-4">
          <strong>{direction.toUpperCase()}</strong>
          <div className="flex flex-wrap gap-3">
            <Button dir={direction}>
              <ButtonIcon>
                <PlusIcon />
              </ButtonIcon>
              Start icon
            </Button>
            <Button dir={direction}>
              End icon
              <ButtonIcon placement="end">
                <PlusIcon />
              </ButtonIcon>
            </Button>
          </div>
          <ButtonGroup dir={direction}>
            <Button>First</Button>
            <Button>Middle</Button>
            <Button>Last</Button>
          </ButtonGroup>
        </section>
      ))}
    </div>
  )
}
