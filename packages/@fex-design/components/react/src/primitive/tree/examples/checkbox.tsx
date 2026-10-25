import { treeCheckDemoData } from './_data/tree-demo'
import { StateDemo } from './state-demo'
export default function Example() {
  return (
    <div className="grid w-full gap-space-lg">
      <StateDemo data={treeCheckDemoData} kind="checked" controlled={false} />
      <StateDemo data={treeCheckDemoData} kind="checked" controlled />
      <StateDemo data={treeCheckDemoData} kind="checked" controlled={false} strict />
      <StateDemo data={treeCheckDemoData} kind="checked" controlled strict />
    </div>
  )
}
