import { treeSelectionDemoData } from './_data/tree-demo'
import { StateDemo } from './state-demo'
export default function Example() {
  return (
    <div class="grid w-full gap-space-lg">
      <StateDemo
        data={treeSelectionDemoData}
        kind="selected"
        controlled={false}
        multiple={false}
        strict={false}
      />
      <StateDemo
        data={treeSelectionDemoData}
        kind="selected"
        controlled={true}
        multiple={false}
        strict={false}
      />
      <StateDemo
        data={treeSelectionDemoData}
        kind="selected"
        controlled={false}
        multiple={true}
        strict={false}
      />
      <StateDemo
        data={treeSelectionDemoData}
        kind="selected"
        controlled={true}
        multiple={true}
        strict={false}
      />
    </div>
  )
}
