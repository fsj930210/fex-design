import { Button, ButtonGroup } from '@fex-design/solid/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

export function GroupExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <ButtonGroup>
        <Button class={buttonClassName()}>Left</Button>
        <Button class={buttonClassName()}>Center</Button>
        <Button class={buttonClassName()}>Right</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" spacing={8}>
        <Button class={buttonClassName()}>Top</Button>
        <Button class={buttonClassName()}>Bottom</Button>
      </ButtonGroup>
    </div>
  )
}
