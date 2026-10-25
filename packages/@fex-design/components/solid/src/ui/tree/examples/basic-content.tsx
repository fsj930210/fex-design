import { Tree } from '@fex-design/solid/ui/tree'
import { treeDemoData } from './_data/tree-demo'
const treeProps = {
  treeData: treeDemoData,
  defaultExpandedKeys: ['root-1', 'root-1-group-1'],
}
export default function TreeBasicExample() {
  return <Tree {...treeProps} class="w-full max-w-xl rounded-md bg-background p-2" />
}
