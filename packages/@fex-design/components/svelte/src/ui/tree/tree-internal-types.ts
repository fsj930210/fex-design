import type { createTreeStore, treeDndItemAction } from '@fex-design/svelte/primitive/tree'

// Private aliases inferred from public logic/part signatures; these are not component exports.
export type TreeController<T extends Record<string, unknown>> = ReturnType<
  typeof createTreeStore<T>
>['tree']
export type TreeOptions<T extends Record<string, unknown>> = Parameters<
  typeof createTreeStore<T>
>[0]
export type TreeDndCallbacks<T extends Record<string, unknown>> = NonNullable<
  Parameters<typeof treeDndItemAction<T>>[1]['callbacks']
>
export type TreeDragEventContext<T extends Record<string, unknown>> = Parameters<
  NonNullable<TreeDndCallbacks<T>['onDrop']>
>[0]
export type TreeItemEventContext<T extends Record<string, unknown>> = Pick<
  TreeDragEventContext<T>,
  'item' | 'event'
>
export type TreeVisibleItem<T extends Record<string, unknown>> = ReturnType<
  TreeController<T>['getVisibleItems']
>[number]
