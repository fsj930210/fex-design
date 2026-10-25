import BasicContent from './basic-content'
import { StateDemo } from './state-demo'
export default function Example() {
  return (
    <div class="grid w-full gap-space-lg">
      <section class="grid gap-space-sm">
        <h3 class="font-medium">基本展示</h3>
        <div class="h-48 overflow-y-auto">
          <BasicContent />
        </div>
      </section>
      <StateDemo kind="expanded" controlled={false} />
      <StateDemo kind="expanded" controlled />
    </div>
  )
}
