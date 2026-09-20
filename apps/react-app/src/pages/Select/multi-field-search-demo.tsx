import { defaultSelectFilterOption } from '@fex-design/core/select/filter-options'
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
import { frameworkOptions } from './data'
import { SelectDemoSection } from './demo-section'

export function MultiFieldSearchDemo() {
  return (
    <SelectDemoSection
      title="Multi-field search"
      description="Search label, searchText and keywords; try google or meta."
    >
      <SelectRoot showSearch items={frameworkOptions} filterOption={defaultSelectFilterOption}>
        <SelectTrigger placeholder="输入 google 或 meta" />
        <SelectContent />
      </SelectRoot>
    </SelectDemoSection>
  )
}
