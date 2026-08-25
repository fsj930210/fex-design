import { Button, ButtonIcon } from '@fex-design/react/primitive/button'
import { LoadingIcon } from '@fex-design/react/icon/loading'
import { buttonSpinnerClassName } from '@fex-design/styles/button'

const Spinner = () => <LoadingIcon className={buttonSpinnerClassName} />

export function LoadingExample() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-[7rem_1fr] items-center gap-4">
        <span className="text-sm font-medium">内置加载图标</span>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled data-loading="true">
            <ButtonIcon>
              <Spinner />
            </ButtonIcon>
            Saving
          </Button>
          <Button disabled data-loading="true">
            Publishing
            <ButtonIcon placement="end">
              <Spinner />
            </ButtonIcon>
          </Button>
          <Button variant="outlined" disabled data-loading="true">
            <ButtonIcon>
              <Spinner />
            </ButtonIcon>
            Loading
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-[7rem_1fr] items-center gap-4">
        <span className="text-sm font-medium">自定义加载图标</span>
        <Button className="w-fit" disabled data-loading="true">
          <ButtonIcon>
            <span className="animate-pulse">•••</span>
          </ButtonIcon>
          Uploading
        </Button>
      </div>
    </div>
  )
}
