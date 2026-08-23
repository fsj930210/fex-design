import { Button } from '@fex-design/react/ui/button'
import { expansionFeature } from '@fex-design/core'
import { useRef } from 'react'
import { createLargeTreeData, departmentFieldNames } from './data'
import { DemoTree, type TreeVirtualViewportHandle } from './demo-tree'
import { TreeDemoSection } from './demo-section'

const largeTreeData = createLargeTreeData()

export function VirtualTreeDemo() {
  const viewportRef = useRef<TreeVirtualViewportHandle>(null)

  return (
    <TreeDemoSection
      title="Virtualization and locate"
      description="Only viewport rows mount. scrollToKey resolves a visible index before asking TanStack Virtual to scroll."
    >
      <div className="mb-2 flex gap-1.5">
        <Button
          size="sm"
          variant="outline"
          onClick={() =>
            viewportRef.current?.scrollToKey('large-3200', { reveal: true, align: 'start' })
          }
        >
          Locate row 3201
        </Button>
      </div>
      <DemoTree
        treeData={largeTreeData}
        fieldNames={departmentFieldNames}
        isLeaf={(node) => node.childCount === 0}
        features={[expansionFeature({ defaultExpandedKeys: ['large-root'] })]}
        virtual
        height={320}
        virtualViewportRef={viewportRef}
        className="rounded-md border border-border bg-background p-1.5"
      />
    </TreeDemoSection>
  )
}
