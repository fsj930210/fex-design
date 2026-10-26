import type {
  TreeController,
  TreeDragEventContext,
  TreeItemEventContext,
  TreeOptions,
  TreeVisibleItem,
} from './tree-internal-types'
import { ChevronDownIcon } from '@fex-design/angular/icons/chevron-down'
import { createTreeSetup } from './tree-setup'
import { createTreeInstance, type TreeInstance } from './tree-instance'
import { NgTemplateOutlet } from '@angular/common'
import { Spinner } from '@fex-design/angular/ui/spinner'
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  ElementRef,
  inject,
  input,
  output,
  TemplateRef,
  viewChild,
} from '@angular/core'
import type { AfterViewInit } from '@angular/core'
import type { TreeNode } from '@fex-design/angular/primitive/tree'
import {
  TreeRoot,
  TreeViewport,
  TreeVirtualViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  TreeCheckbox,
  TreeDndItem,
} from '@fex-design/angular/primitive/tree'
export {
  expansionFeature,
  selectionFeature,
  checkFeature,
  asyncLoadFeature,
  dndFeature,
  keyboardFeature,
  searchFeature,
} from '@fex-design/angular/primitive/tree'

@Component({
  selector: 'div[tree]',
  exportAs: 'tree',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    Spinner,
    ChevronDownIcon,
    TreeRoot,
    TreeViewport,
    TreeVirtualViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    TreeCheckbox,
    TreeDndItem,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './tree.html',
})
export class Tree<
  TNode extends Record<string, unknown> = Record<string, unknown>,
> implements AfterViewInit {
  readonly hostElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  readonly treeData = input<readonly TNode[]>()
  readonly fieldNames = input<TreeOptions<TNode>['fieldNames']>()
  readonly isLeaf = input<(node: Readonly<TreeNode<TNode>>) => boolean>()
  readonly expandedKeys = input<readonly (string | number)[]>()
  readonly defaultExpandedKeys = input<readonly (string | number)[]>()
  readonly selectedKeys = input<readonly (string | number)[]>()
  readonly defaultSelectedKeys = input<readonly (string | number)[]>()
  readonly multiple = input(false)
  readonly checkedKeys = input<readonly (string | number)[]>()
  readonly defaultCheckedKeys = input<readonly (string | number)[]>()
  readonly checkStrict = input(false)
  readonly loadChildren = input<NonNullable<TreeOptions<TNode>['asyncLoader']>['loadChildren']>()
  readonly indent = input(16)
  readonly rowHeight = input(32)
  readonly expansionChange = output<{
    keys: readonly (string | number)[]
    changedKeys: readonly (string | number)[]
  }>({ alias: 'expand' })
  readonly selectionChange = output<{
    keys: readonly (string | number)[]
    changedKeys: readonly (string | number)[]
  }>({ alias: 'select' })
  readonly checkedChange = output<{
    keys: readonly (string | number)[]
    changedKeys: readonly (string | number)[]
  }>({ alias: 'check' })
  readonly loadError = output<{ error: unknown; key: string | number }>()
  private readonly setup = createTreeSetup<TNode>()
  readonly treeOptions = computed(() =>
    this.setup({
      treeData: this.treeData(),
      disabled: this.disabled(),
      selectable: this.selectable(),
      checkable: this.checkable(),
      disableCheckbox: this.disableCheckbox(),
      draggable: this.draggable(),
      droppable: this.droppable(),
      fieldNames: this.fieldNames(),
      isLeaf: this.isLeaf(),
      expandedKeys: this.expandedKeys(),
      defaultExpandedKeys: this.defaultExpandedKeys(),
      selectedKeys: this.selectedKeys(),
      defaultSelectedKeys: this.defaultSelectedKeys(),
      multiple: this.multiple(),
      checkedKeys: this.checkedKeys(),
      defaultCheckedKeys: this.defaultCheckedKeys(),
      checkStrict: this.checkStrict(),
      loadChildren: this.loadChildren(),
      indent: this.indent(),
      rowHeight: this.rowHeight(),
      onExpand: (keys, meta) => this.expansionChange.emit({ keys, ...meta }),
      onSelect: (keys, meta) => this.selectionChange.emit({ keys, ...meta }),
      onCheck: (keys, meta) => this.checkedChange.emit({ keys, ...meta }),
      onLoadError: (error, key) => this.loadError.emit({ error, key }),
    }),
  )
  readonly virtual = input(false)
  readonly virtualHeight = input(320)
  readonly virtualOverscan = input(6)
  readonly disabled = input(false)
  readonly selectable = input(true)
  readonly disableCheckbox = input(false)
  readonly droppable = input(true)
  readonly checkable = input(false)
  readonly block = input(false)
  readonly draggable = input(false)
  readonly classNames = input<
    Partial<
      Record<
        'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
        string
      >
    >
  >({})
  readonly styles = input<
    Partial<
      Record<
        'root' | 'viewport' | 'item' | 'trigger' | 'checkbox' | 'title' | 'dropIndicator',
        string
      >
    >
  >({})
  private readonly treeRootElement = viewChild<ElementRef<HTMLElement>>('treeRootElement')
  private readonly viewport = viewChild(TreeViewport)
  private readonly virtualViewport = viewChild(TreeVirtualViewport)
  private readonly root = viewChild<TreeRoot<TNode>>(TreeRoot)
  private readonly instance = createTreeInstance(
    () => {
      const root = this.root()
      if (!root) throw new Error('Tree instance is available after the view has initialized')
      return root.tree()
    },
    () => (this.virtual() ? this.virtualViewport() : this.viewport()),
  )
  scrollTo(...args: Parameters<TreeInstance<TNode>['scrollTo']>) {
    return this.instance.scrollTo(...args)
  }
  expand(...args: Parameters<TreeInstance<TNode>['expand']>) {
    return this.instance.expand(...args)
  }
  collapse(...args: Parameters<TreeInstance<TNode>['collapse']>) {
    return this.instance.collapse(...args)
  }
  expandAll(...args: Parameters<TreeInstance<TNode>['expandAll']>) {
    return this.instance.expandAll(...args)
  }
  collapseAll(...args: Parameters<TreeInstance<TNode>['collapseAll']>) {
    return this.instance.collapseAll(...args)
  }
  select(...args: Parameters<TreeInstance<TNode>['select']>) {
    return this.instance.select(...args)
  }
  unselect(...args: Parameters<TreeInstance<TNode>['unselect']>) {
    return this.instance.unselect(...args)
  }
  clearSelection(...args: Parameters<TreeInstance<TNode>['clearSelection']>) {
    return this.instance.clearSelection(...args)
  }
  check(...args: Parameters<TreeInstance<TNode>['check']>) {
    return this.instance.check(...args)
  }
  uncheck(...args: Parameters<TreeInstance<TNode>['uncheck']>) {
    return this.instance.uncheck(...args)
  }
  clearChecked(...args: Parameters<TreeInstance<TNode>['clearChecked']>) {
    return this.instance.clearChecked(...args)
  }
  getNode(...args: Parameters<TreeInstance<TNode>['getNode']>) {
    return this.instance.getNode(...args)
  }
  getPath(...args: Parameters<TreeInstance<TNode>['getPath']>) {
    return this.instance.getPath(...args)
  }
  getTreeData(...args: Parameters<TreeInstance<TNode>['getTreeData']>) {
    return this.instance.getTreeData(...args)
  }
  readonly itemTemplate =
    contentChild<TemplateRef<{ $implicit: TreeVisibleItem<TNode>; tree: TreeController<TNode> }>>(
      TemplateRef,
    )
  readonly itemClick = output<TreeItemEventContext<TNode>>()
  readonly itemDoubleClick = output<TreeItemEventContext<TNode>>()
  readonly itemContextMenu = output<TreeItemEventContext<TNode>>()
  readonly dragStart = output<TreeDragEventContext<TNode>>()
  readonly dragEnd = output<TreeDragEventContext<TNode>>()
  readonly dragEnter = output<TreeDragEventContext<TNode>>()
  readonly dragOver = output<TreeDragEventContext<TNode>>()
  readonly dragLeave = output<TreeDragEventContext<TNode>>()
  readonly drop = output<TreeDragEventContext<TNode>>()

  ngAfterViewInit() {
    const root = this.treeRootElement()?.nativeElement
    if (!root) return
    for (const attribute of Array.from(this.hostElement.attributes)) {
      if (attribute.name === 'class' || attribute.name === 'style' || attribute.name === 'tree')
        continue
      root.setAttribute(attribute.name, attribute.value)
    }
  }

  handleClick(event: MouseEvent, item: TreeVisibleItem<TNode>) {
    this.itemClick.emit({ event, item })
  }
  handleDoubleClick(event: MouseEvent, item: TreeVisibleItem<TNode>) {
    this.itemDoubleClick.emit({ event, item })
  }
  handleContextMenu(event: MouseEvent, item: TreeVisibleItem<TNode>) {
    this.itemContextMenu.emit({ event, item })
  }
  handleDnd(
    name: 'dragStart' | 'dragEnd' | 'dragEnter' | 'dragOver' | 'dragLeave' | 'drop',
    context: TreeDragEventContext<Record<string, unknown>>,
  ) {
    // The directive resolves this event from this Tree instance; its template has no generic data input.
    this[name].emit(context as TreeDragEventContext<TNode>)
  }
}
export { createTreeSignals } from '@fex-design/angular/primitive/tree'
export type { TreeKey } from '@fex-design/angular/primitive/tree'

export type { TreeInstance, TreeScrollOptions } from './tree-instance'

export type { TreeNode } from '@fex-design/angular/primitive/tree'
