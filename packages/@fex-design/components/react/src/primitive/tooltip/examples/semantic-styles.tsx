import {
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
  TooltipArrow,
} from '@fex-design/react/primitive/tooltip'
import { Button } from '@fex-design/react/primitive/button'
export function TooltipSemanticStylesExample() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <TooltipRoot>
        <TooltipTrigger>{(binding) => <Button {...binding}>查看结构化样式</Button>}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            className="rounded-2xl font-semibold shadow-xl"
            style={{
              backgroundColor: '#7c3aed',
              color: '#fff',
              fontSize: '16px',
              lineHeight: '24px',
              maxWidth: '260px',
              padding: '12px 20px',
            }}
          >
            这是明显放大的紫色结构化提示
            <TooltipArrow
              className="rounded-[3px]"
              style={{ backgroundColor: '#7c3aed', width: '12px', height: '12px' }}
            />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </div>
  )
}
