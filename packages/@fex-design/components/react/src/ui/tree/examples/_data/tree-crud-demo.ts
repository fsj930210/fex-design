export const treeCrudData: readonly Record<string, unknown>[] = [
  {
    key: 'department-1',
    title: 'Department 1',
    children: [
      {
        key: 'group-1',
        title: 'Group 1.1',
        children: [
          { key: 'item-1', title: 'Item 1.1.1' },
          { key: 'item-2', title: 'Item 1.1.2' },
        ],
      },
    ],
  },
  { key: 'department-2', title: 'Department 2' },
]
