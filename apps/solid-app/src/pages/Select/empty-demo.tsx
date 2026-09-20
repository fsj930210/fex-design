import {
  SelectContent,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/solid/primitive/select'
import { SelectDemoSection as Demo } from './demo-section'
export function EmptyDemo() {
  return (
    <Demo
      title="Empty"
      description="An explicit empty state is rendered when there are no options."
    >
      <SelectRoot items={[]}>
        <SelectTrigger placeholder="请选择" />
        <SelectContent />
      </SelectRoot>
    </Demo>
  )
}
