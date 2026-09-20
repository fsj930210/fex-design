import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
import { virtualOptions } from './data'
import { SelectDemoSection } from './demo-section'

export function VirtualDemo() {
  return (
    <SelectDemoSection
      title="Virtual scrolling"
      description="Only the visible fixed-height options and overscan are mounted from 1,000 entries."
    >
      <SelectRoot showSearch items={virtualOptions} virtual={{ itemHeight: 32, overscan: 4 }}>
        <SelectTrigger placeholder="请输入关键词或选择选项" />
        <SelectContent />
      </SelectRoot>
    </SelectDemoSection>
  )
}
