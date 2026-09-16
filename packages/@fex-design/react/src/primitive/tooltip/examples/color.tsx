import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipRoot,
  TooltipTrigger,
} from '@fex-design/react/primitive/tooltip'
import { Button } from '@fex-design/react/ui/button'

const colors = [
  { label: '品牌蓝', value: '#1677ff' },
  { label: '紫色', value: '#722ed1' },
  { label: '暖红色', value: '#d4380d' },
]
export function ColorExample() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {colors.map(({ label, value }) => (
        <TooltipRoot key={value}>
          <TooltipTrigger>{(props) => <Button {...props}>{label}</Button>}</TooltipTrigger>
          <TooltipPortal>
            <TooltipContent color={value}>
              {label} Tooltip
              <TooltipArrow />
            </TooltipContent>
          </TooltipPortal>
        </TooltipRoot>
      ))}
    </div>
  )
}
