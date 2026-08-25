import { Button } from '@fex-design/solid/ui/button'

export function BasicExample() {
  return (
    <div class="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="solid" color="primary">
        Primary
      </Button>
    </div>
  )
}
