import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
import { frameworkOptions } from './data'
import { SelectDemoSection } from './demo-section'

export function MaxCountDemo() {
  return (
    <SelectDemoSection
      title="Maximum selection count"
      description="maxCount limits actual selection; maxTagCount only controls presentation."
    >
      <SelectRoot multiple maxCount={2} options={frameworkOptions} defaultValue={['react']}>
        <SelectTrigger maxTagCount={2} placeholder="最多选择两项" />
        <SelectContent />
      </SelectRoot>
    </SelectDemoSection>
  )
}
