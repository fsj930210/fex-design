import { defaultSelectFilterOption } from '@fex-design/core/select/filter-options'
import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
import { frameworkOptions } from './data'
import { SelectDemoSection } from './demo-section'

export function LocalSearchDemo() {
  return (
    <SelectDemoSection
      title="Local search"
      description="filterOption filters the current options locally; onSearch still receives every keyword."
    >
      <SelectRoot
        showSearch
        filterOption={defaultSelectFilterOption}
        items={frameworkOptions}
        onSearch={() => undefined}
      >
        <SelectTrigger placeholder="请输入关键词搜索" />
        <SelectContent />
      </SelectRoot>
    </SelectDemoSection>
  )
}
