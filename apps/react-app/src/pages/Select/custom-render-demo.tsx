import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
import { frameworkOptions } from './data'
import { SelectDemoSection } from './demo-section'

export function CustomRenderDemo() {
  return (
    <SelectDemoSection
      title="Custom option rendering"
      description="optionRender replaces option content while selection and keyboard behavior remain intact."
    >
      <SelectRoot items={frameworkOptions}>
        <SelectTrigger placeholder="请选择技术" />
        <SelectContent
          optionRender={(option) => (
              <div className="flex items-center justify-between gap-3">
                <span>{option.label}</span>
                <span className="text-xs text-muted-foreground">{option.group}</span>
              </div>
            )}
        />
      </SelectRoot>
    </SelectDemoSection>
  )
}
