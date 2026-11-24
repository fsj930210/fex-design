import {
  DropdownRoot,
  DropdownTrigger,
  DropdownPortal,
  DropdownContent,
  type DropdownPopoverOptions,
} from '@fex-design/react/primitive/dropdown'
import { MenuItem } from '@fex-design/react/primitive/menu'
import { Button } from '@fex-design/react/primitive/button'
const cases: { label: string; options: DropdownPopoverOptions }[] = [
  { label: '点击', options: { trigger: ['click'] } },
  { label: '悬停', options: { trigger: ['hover'] } },
  { label: '聚焦', options: { trigger: ['focus'] } },
  { label: '悬停 + 聚焦', options: { trigger: ['hover', 'focus'] } },
  { label: '悬停延迟', options: { trigger: ['hover'], hoverOpenDelay: 300, hoverCloseDelay: 400 } },
]
export function DropdownTriggersExample() {
  return (
    <div className="flex min-h-64 flex-wrap items-center justify-center gap-3 p-6">
      {cases.map(({ label, options }) => (
        <DropdownRoot key={label} popoverProps={options}>
          <DropdownTrigger>{(props) => <Button {...props}>{label}</Button>}</DropdownTrigger>
          <DropdownPortal>
            <DropdownContent>
              <MenuItem value="rename">重命名</MenuItem>
              <MenuItem value="copy">复制</MenuItem>
            </DropdownContent>
          </DropdownPortal>
        </DropdownRoot>
      ))}
    </div>
  )
}
