import { treeSelectionDemoData } from './_data/tree-demo'
import { StateDemo } from './state-demo'
export default function Example() {
  return (
    <div className="grid w-full gap-space-lg">
      <StateDemo data={treeSelectionDemoData} kind="selected" controlled={false} />
      <StateDemo data={treeSelectionDemoData} kind="selected" controlled />
      <StateDemo data={treeSelectionDemoData} kind="selected" controlled={false} multiple />
      <StateDemo data={treeSelectionDemoData} kind="selected" controlled multiple />
    </div>
  )
}
