import { Button } from '@fex-design/react/ui/button'

export function BasicExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="solid" color="primary">
        Primary
      </Button>
    </div>
  )
}
