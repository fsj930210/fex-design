import { Button } from '@fex-design/solid/primitive/button'

export function NativeExample() {
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
        <Button type="button" onClick={() => buttonElement?.focus()}>
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
