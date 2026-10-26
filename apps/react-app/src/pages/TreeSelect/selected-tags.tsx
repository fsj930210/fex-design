import { Tag } from '@fex-design/react/primitive/tag'
import { useTreeSelect } from '@fex-design/react/primitive/tree-select'
import type { DepartmentNode } from '../Tree/data'

export function SelectedTags({ maxTagCount }: { maxTagCount: number }) {
  const treeSelect = useTreeSelect<DepartmentNode>()
  const items = treeSelect.snapshot.selectedItems
  if (items.length > maxTagCount)
    return (
      <Tag size="sm" className="ml-1.5">
        已选择 {items.length} 项
      </Tag>
    )
  return (
    <>
      {items.map((item) => (
        <Tag
          key={item.value}
          size="sm"
          closable
          className="ml-1.5"
          onPointerDownCapture={(event) => event.preventDefault()}
          onClose={(event) => {
            event.stopPropagation()
            treeSelect.controller.setValues(
              treeSelect.snapshot.values.filter((value) => value !== item.value),
            )
          }}
        >
          {item.label}
        </Tag>
      ))}
    </>
  )
}
