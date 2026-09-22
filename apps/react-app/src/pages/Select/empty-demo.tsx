import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
import { SelectDemoSection } from './demo-section'

export function EmptyDemo() {
  return (
    <SelectDemoSection
      title="Empty"
      description="Empty content is explicit so products can provide domain-specific guidance."
    >
      <SelectRoot options={[]}>
        <SelectTrigger placeholder="暂无可选项" />
        <SelectContent emptyContent="No technologies available" />
      </SelectRoot>
    </SelectDemoSection>
  )
}
