import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
import { frameworkOptions } from './data'
import { SelectDemoSection } from './demo-section'

export function SingleDemo() {
  return (
    <SelectDemoSection
      title="Single"
      description="Single selection closes the panel after choosing an option."
    >
      <SelectRoot items={frameworkOptions} defaultValue="react">
        <SelectTrigger placeholder="请选择框架" />
        <SelectContent />
      </SelectRoot>
    </SelectDemoSection>
  )
}
