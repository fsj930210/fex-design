import { For } from 'solid-js'
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/solid/primitive/tooltip'
import { Button } from '@fex-design/solid/primitive/button'

const colors = [
  { label: '品牌蓝', value: '#1677ff' },
  { label: '紫色', value: '#722ed1' },
  { label: '暖红色', value: '#d4380d' },
]
export function ColorExample() {
  return (
    <div class="flex flex-wrap items-center justify-center gap-4">
      <For each={colors}>
        {(item) => (
          <TooltipRoot>
            <TooltipTrigger>
              {(trigger) => (
                <Button {...trigger.props} ref={trigger.ref}>
                  {item.label}
                </Button>
              )}
            </TooltipTrigger>
            <TooltipPortal>
              <TooltipContent color={item.value}>
                {item.label} Tooltip
                <TooltipArrow />
              </TooltipContent>
            </TooltipPortal>
          </TooltipRoot>
        )}
      </For>
    </div>
  )
}
