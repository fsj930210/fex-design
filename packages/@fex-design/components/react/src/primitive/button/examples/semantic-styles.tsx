import { Button, ButtonIcon } from '@fex-design/react/primitive/button'
import { LoadingIcon } from '@fex-design/react/icons/loading'

export function ButtonSemanticStylesExample() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button disabled data-loading="true">
        <ButtonIcon data-icon="inline-start" className="rounded bg-violet-100 p-0.5">
          <LoadingIcon className="size-[1em] animate-spin text-violet-700" />
        </ButtonIcon>
        Start
      </Button>
      <Button disabled data-loading="true">
        End
        <ButtonIcon data-icon="inline-end" className="rounded bg-cyan-100 p-0.5">
          <LoadingIcon className="size-[1em] animate-spin text-cyan-700" />
        </ButtonIcon>
      </Button>
    </div>
  )
}
