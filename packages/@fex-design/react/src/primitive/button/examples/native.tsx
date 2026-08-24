import { useRef } from 'react'
import { Button } from '@fex-design/react/primitive/button'

export function NativeExample() {
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <div className="flex flex-wrap items-center gap-3">
      <form onSubmit={(event) => event.preventDefault()}>
        <Button ref={buttonRef}>Focusable</Button>
        <Button type="button" onClick={() => buttonRef.current?.focus()}>
          Focus button
        </Button>
        <Button type="submit" name="action" value="save">
          Save
        </Button>
        <Button type="reset">Reset</Button>
        <Button disabled aria-label="Unavailable">
          Disabled
        </Button>
      </form>
    </div>
  )
}
