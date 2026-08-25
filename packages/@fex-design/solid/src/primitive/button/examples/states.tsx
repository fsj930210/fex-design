import { Button } from '@fex-design/solid/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

export function StatesExample() {
  return (
    <div class="flex flex-wrap items-center gap-6">
      <Button class={buttonClassName()}>Default</Button>
      <Button class={buttonClassName()}>Hover / Focus</Button>
      <Button class={buttonClassName()} disabled>
        Disabled
      </Button>
      <Button class={buttonClassName()} aria-pressed="true">
        Pressed
      </Button>
    </div>
  )
}



