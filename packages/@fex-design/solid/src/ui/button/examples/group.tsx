import { Button, ButtonGroup } from '@fex-design/solid/ui/button'

export function GroupExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <ButtonGroup>
        <Button>Left</Button>
        <Button>Center</Button>
        <Button>Right</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" spacing={8}>
        <Button>Top</Button>
        <Button>Bottom</Button>
      </ButtonGroup>
    </div>
  )
}
