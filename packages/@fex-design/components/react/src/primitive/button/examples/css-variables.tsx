import { Button, ButtonIcon } from '@fex-design/react/primitive/button'
import { LoadingIcon } from '@fex-design/react/icons/loading'
export function ButtonCssVariablesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button>默认按钮</Button>
      <Button
        variant="solid"
        disabled
        data-loading="true"
        className="[--button-height:3rem] [--button-content-gap:0.75rem] [--button-color:#7c3aed] [--button-color-foreground:white] [--button-color-hover:#6d28d9]"
      >
        <ButtonIcon data-icon="inline-start">
          <LoadingIcon className="size-5 text-violet-100 animate-spin" />
        </ButtonIcon>
        实例变量按钮
      </Button>
    </div>
  )
}
