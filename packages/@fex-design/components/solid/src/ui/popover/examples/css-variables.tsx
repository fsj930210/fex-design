import { Popover } from '@fex-design/solid/ui/popover'
import { popoverStyleDemo as demo } from '@fex-design/docs-shared/popover-demo'
import { Button } from '@fex-design/solid/ui/button'

const rootStyle = demo.customVariables
export function PopoverCssVariablesExample() {
  return (
    <div class="w-full flex items-center justify-center min-h-[360px] py-16">
      <Popover
        arrow
        title={demo.title}
        content={demo.content}
        classNames={demo.classNames}
        styles={{ root: rootStyle }}
      >
        {(binding) => (
          <Button {...binding.props} ref={binding.ref}>
            {demo.trigger}
          </Button>
        )}
      </Popover>
    </div>
  )
}
