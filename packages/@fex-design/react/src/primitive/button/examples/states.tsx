import { Button } from '@fex-design/react/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

export function StatesExample() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <Button className={buttonClassName()}>Default</Button>
      <Button className={buttonClassName()}>Hover / Focus</Button>
      <Button className={buttonClassName()} disabled>
        Disabled
      </Button>
      <Button className={buttonClassName()} aria-pressed="true">
        Pressed
      </Button>
    </div>
  )
}
