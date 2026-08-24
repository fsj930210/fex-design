import { Button, ButtonGroup } from '@fex-design/solid/primitive/button'

export function GroupExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <ButtonGroup>
        <Button>One</Button>
        <Button>Two</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" spacing={8}>
        <Button>Top</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    </div>
  )
}
