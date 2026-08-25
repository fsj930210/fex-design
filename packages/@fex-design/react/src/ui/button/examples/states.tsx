import { Button } from '@fex-design/react/ui/button'

export function StatesExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button>Default</Button>
      <Button>Hover / Focus</Button>
      <Button disabled>Disabled</Button>
      <Button aria-pressed="true">Pressed</Button>
    </div>
  )
}
