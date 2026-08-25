import { PlusIcon } from '@fex-design/react/icon/plus'
import { Button, ButtonGroup } from '@fex-design/react/ui/button'

export function DirectionExample() {
  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      {(['ltr', 'rtl'] as const).map((direction) => (
        <section key={direction} dir={direction} className="grid gap-3 rounded-lg border p-4">
          <strong>{direction.toUpperCase()}</strong>
          <div className="flex flex-wrap gap-3">
            <Button icon={<PlusIcon />}>Start icon</Button>
            <Button icon={<PlusIcon />} iconPlacement="end">
              End icon
            </Button>
          </div>
          <ButtonGroup>
            <Button>First</Button>
            <Button>Middle</Button>
            <Button>Last</Button>
          </ButtonGroup>
        </section>
      ))}
    </div>
  )
}
