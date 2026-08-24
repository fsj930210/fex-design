import { useRef } from 'react'
import { Button } from '@fex-design/react/ui/button'

export function StatesExample() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <form onSubmit={(event) => event.preventDefault()}>
        <Button ref={buttonRef}>Focusable</Button>
        <Button type="button" variant="ghost" onClick={() => buttonRef.current?.focus()}>
          Focus button
        </Button>
        <Button type="submit">Submit</Button>
        <Button type="reset" variant="outline">
          Reset
        </Button>
        <Button disabled>Disabled</Button>
        <Button aria-pressed="true" data-testid="toggle">
          Pressed
        </Button>
      </form>
    </div>
  )
}
