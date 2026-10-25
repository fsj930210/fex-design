import type { TreeDataNode } from '@fex-design/angular/ui/tree'

export const treeDemoData: readonly TreeDataNode<string, string>[] = Array.from(
  { length: 2 },
  (_, rootIndex) => ({
    key: `root-${rootIndex + 1}`,
    title: `Department ${rootIndex + 1}`,
    children: Array.from({ length: 3 }, (_, groupIndex) => ({
      key: `root-${rootIndex + 1}-group-${groupIndex + 1}`,
      title: `Group ${rootIndex + 1}.${groupIndex + 1}`,
      children: Array.from({ length: 5 }, (_, leafIndex) => ({
        key: `root-${rootIndex + 1}-group-${groupIndex + 1}-item-${leafIndex + 1}`,
        title: `Item ${rootIndex + 1}.${groupIndex + 1}.${leafIndex + 1}`,
      })),
    })),
  }),
)

export interface OrganizationTreeNode extends Record<string, unknown> {
  id: string
  name: string
  children?: readonly OrganizationTreeNode[]
  leaf: boolean
  unavailable?: boolean
}

export const organizationTreeData: readonly OrganizationTreeNode[] = [
  {
    id: 'engineering',
    name: '研发部',
    leaf: false,
    children: [
      {
        id: 'frontend',
        name: '前端组',
        leaf: false,
        children: [
          { id: 'web', name: 'Web 应用', leaf: true },
          { id: 'mobile', name: '移动端（禁用）', leaf: true, unavailable: true },
        ],
      },
      { id: 'backend', name: '后端组', leaf: true },
    ],
  },
  {
    id: 'design',
    name: '设计部',
    leaf: false,
    children: [{ id: 'product', name: '产品设计', leaf: true }],
  },
]

export const treeCheckDemoData: readonly TreeDataNode<string, string>[] = treeDemoData.map(
  (root) =>
    root.key !== 'root-1'
      ? root
      : {
          ...root,
          children:
            root.children?.map((group) =>
              group.key !== 'root-1-group-1'
                ? group
                : {
                    ...group,
                    children:
                      group.children?.map((item) =>
                        item.key !== 'root-1-group-1-item-3'
                          ? item
                          : {
                              ...item,
                              title: item.title + '（不可勾选）',
                              disableCheckbox: true,
                            },
                      ) ?? [],
                  },
            ) ?? [],
        },
)

export const treeDndDemoData: readonly TreeDataNode<string, string>[] = treeDemoData.map((root) =>
  root.key !== 'root-1'
    ? root
    : {
        ...root,
        children:
          root.children?.map((group) =>
            group.key !== 'root-1-group-1'
              ? group
              : {
                  ...group,
                  children:
                    group.children?.map((item) =>
                      item.key === 'root-1-group-1-item-2'
                        ? { ...item, title: item.title + '（不可拖动）', draggable: false }
                        : item.key === 'root-1-group-1-item-3'
                          ? { ...item, title: item.title + '（不可放置）', droppable: false }
                          : item,
                    ) ?? [],
                },
          ) ?? [],
      },
)

export const treeSelectionDemoData: readonly TreeDataNode<string, string>[] = treeDemoData.map(
  (root) =>
    root.key !== 'root-1'
      ? root
      : {
          ...root,
          children:
            root.children?.map((group) =>
              group.key !== 'root-1-group-1'
                ? group
                : {
                    ...group,
                    children:
                      group.children?.map((item) =>
                        item.key !== 'root-1-group-1-item-3'
                          ? item
                          : {
                              ...item,
                              title: item.title + '（不可选择）',
                              selectable: false,
                            },
                      ) ?? [],
                  },
            ) ?? [],
        },
)
