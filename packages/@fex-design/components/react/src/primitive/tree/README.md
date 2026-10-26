# Tree primitive

Tree is a headless React primitive backed by the framework-independent controller in
`@fex-design/core`. No interaction feature is installed implicitly, and there is no
published `ui/tree` wrapper yet. The React demo composes the primitive locally so that a future
UI API is not fixed by demo-only decisions.

## Imports

```tsx
import { createTreeController } from '@fex-design/core/tree/create-tree-controller'
import { expansionFeature } from '@fex-design/core/tree/features/expansion'
import { selectionFeature } from '@fex-design/core/tree/features/selection'
import {
  TreeItem,
  TreeRoot,
  TreeTitle,
  TreeTrigger,
  TreeViewport,
} from '@fex-design/react/primitive/tree'
```

DnD has a separate React entry so applications that do not use it do not load its adapter:

```tsx
import { dndFeature } from '@fex-design/core/tree/features/dnd'
import { useTreeDndItem } from '@fex-design/react/primitive/tree/use-tree-dnd-item'
```

## Basic composition

```tsx
<TreeRoot
  options={{
    treeData,
    fieldNames: { key: 'id', title: 'name', children: 'nodes' },
    features: [expansionFeature({ defaultExpandedKeys: ['root'] }), selectionFeature()],
  }}
>
  {(tree) => (
    <TreeViewport>
      {(item) => (
        <TreeItem key={item.key} itemKey={item.key}>
          {({ item: currentItem, itemProps }) => (
            <div {...itemProps}>
              <TreeTrigger itemKey={currentItem.key} />
              <TreeTitle>{String(currentItem.data.name)}</TreeTitle>
            </div>
          )}
        </TreeItem>
      )}
    </TreeViewport>
  )}
</TreeRoot>
```

## TreeRoot props

| Prop         | Type                                 | Default | Required                    | Description                                                             |
| ------------ | ------------------------------------ | ------- | --------------------------- | ----------------------------------------------------------------------- |
| `options`    | `TreeOptions<TNode>`                 | —       | When `controller` is absent | Creates and updates an owned controller.                                |
| `controller` | `TreeController<TNode>`              | —       | No                          | Uses a controller that may live outside the rendered tree.              |
| `indent`     | `number`                             | `16`    | No                          | Horizontal depth step in pixels; DnD reads the same value from context. |
| `rowHeight`  | `number`                             | `32`    | No                          | Row height and the default virtual size estimate.                       |
| `children`   | `ReactNode \| ((tree) => ReactNode)` | —       | Yes                         | Tree content or controller render function.                             |
| `className`  | `string`                             | —       | No                          | Merged onto the root tree element.                                      |
| `style`      | `CSSProperties`                      | —       | No                          | Native root styles.                                                     |

`TreeRoot` also forwards native `div` props. When both `controller` and `options` are supplied,
React synchronizes the options to the supplied external controller through
`controller.updateOptions(options)`.

## Primitive parts

| Part                  | Important props                               | Description                                                                                                                              |
| --------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `TreeViewport`        | `children(item)`                              | Renders the controller's library-independent visible item list.                                                                          |
| `TreeVirtualViewport` | `height`, `overscan`, `ref`, `children(item)` | Adapts visible items to `@tanstack/react-virtual`.                                                                                       |
| `TreeItem`            | `itemKey`, `block`, `children(state)`         | Subscribes only to its node and exposes `itemProps`, state, and actions. `block` fills the selectable title after leading tree controls. |
| `TreeTrigger`         | `itemKey`                                     | Loads children when necessary, then explicitly expands or collapses the node.                                                            |
| `TreeTitle`           | native `span` props                           | Minimal title slot with shared Tree styles.                                                                                              |

`TreeVirtualViewportHandle.scrollTo(key, { align, reveal })` resolves a core visible index and
then asks TanStack Virtual to scroll. `reveal: true` expands the ancestor path through the focus
feature before resolving the index.

## Tree options and controlled state

`fieldNames` maps backend fields without converting every node. Its defaults are `key`, `title`,
`children`, `isLeaf`, and `disabled`. `isLeaf(node)` may override the mapped leaf field when an
empty or missing children array does not prove that a node is a leaf.

The controlled pairs are:

| Value          | Default value         | Change callback        |
| -------------- | --------------------- | ---------------------- |
| `expandedKeys` | `defaultExpandedKeys` | `onExpandedKeysChange` |
| `selectedKeys` | `defaultSelectedKeys` | `onSelectedKeysChange` |
| `checkedKeys`  | `defaultCheckedKeys`  | `onCheckedKeysChange`  |
| `focusedKey`   | `defaultFocusedKey`   | `onFocusedKeyChange`   |

Selection is single by default. Install `selectionFeature({ multiple: true })` or set the matching
controller option to enable multiple selection.

## Controller API

The controller owns derived indexing, interaction snapshots, subscriptions, and visible projection.
Source tree data remains exclusively owned by the caller.

| Method                                                                   | Description                                                                  |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| `getSnapshot()`                                                          | Returns tree data, interaction state, normalized items, and visible items.   |
| `subscribe(listener)`                                                    | Subscribes to the full snapshot.                                             |
| `subscribeNode(key, listener)`                                           | Subscribes to one node row.                                                  |
| `subscribeVisible(listener)`                                             | Subscribes to visible-list changes.                                          |
| `updateOptions(nextOptions)`                                             | Updates data, field mapping, callbacks, and controlled state.                |
| `getVisibleItems()`                                                      | Returns the flattened expanded projection without a virtual-list dependency. |
| `getVisibleCount()` / `getVisibleItemAt(index)` / `getVisibleIndex(key)` | Index-oriented virtualization helpers.                                       |
| `hasFeature(id)` / `getFeature(id)`                                      | Reads an explicitly installed feature API.                                   |

Source tree data belongs exclusively to the caller. The controller never inserts, updates, removes, or moves source nodes. Drag callbacks describe the drop intent. A load callback returns Promise<void> and updates the caller's treeData; the component only tracks loading and error state. After a successful server mutation, fetch the tree again and pass the result as treeData.

## Optional features

| Feature      | Public import                               | Options                                                 | Requires         | API                                                                |
| ------------ | ------------------------------------------- | ------------------------------------------------------- | ---------------- | ------------------------------------------------------------------ |
| Expansion    | `@fex-design/core/tree/features/expansion`  | `defaultExpandedKeys`                                   | —                | `expand`, `collapse`, `toggle`, `expandAll`, `collapseAll`         |
| Selection    | `@fex-design/core/tree/features/selection`  | `defaultSelectedKeys`, `multiple`                       | —                | `isMultiple`, `select`, `unselect`, `toggle`, `selectAll`, `clear` |
| Check        | `@fex-design/core/tree/features/check`      | `mode`, `defaultCheckedKeys`                            | —                | `check`, `uncheck`, `checkAll`, `clear`, `getState`                |
| Focus/locate | `@fex-design/core/tree/features/focus`      | —                                                       | Expansion        | `focus`, `reveal`                                                  |
| Keyboard     | `@fex-design/core/tree/features/keyboard`   | —                                                       | Expansion, Focus | Enables primitive keyboard behavior.                               |
| Async load   | `@fex-design/core/tree/features/async-load` | `loadChildren`, `onLoadError`                           | Expansion        | `load`, `retry`, `getState`, `getError`                            |
| Search data  | `@fex-design/core/tree/features/search`     | —                                                       | —                | `getSubtree`                                                       |
| DnD          | `@fex-design/core/tree/features/dnd`        | `allowDropInsideLeaf`, `maxDepth`, `canDrag`, `canDrop` | —                | `canDrag`, `resolve`, `drop`                                       |

Each feature contains its own small algorithms in the same file. The controller does not import
optional behavior, so unused features remain tree-shakeable. Dependencies are validated before
setup; duplicate, missing, or conflicting registrations throw descriptive errors. The feature set
is fixed when the controller is created, while `updateOptions()` updates runtime data and state.

## Search

`searchFeature().getSubtree({ keyword, filterTreeNode })` returns structural-sharing tree data that
contains matches and their ancestor paths. Core does not prescribe a search mode or markup. A UI
may keep the base tree mounted and CSS-hidden while rendering the returned search tree, or only pass
the keyword into a custom title renderer for highlighting.

## DnD behavior

Vertical overlap resolves the target row. When the dragged row overlaps that target and its left edge reaches one configured indent to the right, the intent becomes the target's first child; otherwise it is inserted after the target. The returned intent exposes
the relative `indicatorOffset` required by a custom row renderer.
Moving left during an ordered drop outdents one or more levels. The resolved intent contains the
exact parent, index, and row-relative `indicatorOffset`; the React adapter uses
that offset for the insertion line, including an indented bottom line for `inside`.

`allowDropInsideLeaf` defaults to `true`, matching structural editing: a leaf can become a parent.
When `isLeaf` reads backend metadata, the application must make that resolver acknowledge newly
inserted children—for example `(node.children?.length ?? node.childCount) === 0`—because core cannot
guess how to mutate an arbitrary backend leaf marker. After the caller accepts an inside drop and supplies updated data, it can expand the target
through controlled expandedKeys or an instance method.

When composing a draggable row, merge `dnd.itemProps.style` with `TreeItem`'s `itemProps.style` so
the row keeps both its size/depth styles and the indicator position variable.

## Notes

- Keys must be stable and unique.
- Feature functions are installed explicitly through `features`; the primitive imports none of them
  as defaults.
- UI code owns checkbox, spinner, search input, title markup, and row composition.
- Async loading is event-driven from the trigger; ordinary interaction flow is not implemented with
  state watchers.
