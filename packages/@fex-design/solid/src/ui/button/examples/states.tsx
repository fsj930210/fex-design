import { Button } from '@fex-design/solid/ui/button'

export function StatesExample() {
  let buttonElement: HTMLButtonElement | undefined

  return (
    <div class="flex flex-wrap items-center gap-3">
      <form onSubmit={(event) => event.preventDefault()}>
        <Button
          ref={(element) => {
            buttonElement = element
          }}
        >
          Focusable
        </Button>
        <Button type="button" variant="ghost" onClick={() => buttonElement?.focus()}>
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
