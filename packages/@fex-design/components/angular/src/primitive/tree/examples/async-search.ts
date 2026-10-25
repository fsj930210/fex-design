import type { TreeDataNode } from '@fex-design/angular/primitive/tree'
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  TreeTrigger,
  TreeTitle,
  expansionFeature,
  asyncLoadFeature,
} from '@fex-design/angular/primitive/tree'
import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/angular/primitive/select'
import {
  loadRemoteTree,
  searchRemoteTree,
  loadRemoteAncestors,
  updateRemoteChildren,
  type TreeSearchMatch,
  type TreeAncestorResult,
} from './_data/tree-remote-demo'
@Component({
  selector: 'tree-async-search-example',
  standalone: true,
  imports: [
    TreeRoot,
    TreeViewport,
    TreeItem,
    TreeTrigger,
    TreeTitle,
    SelectRoot,
    SelectTrigger,
    SelectContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './async-search.html',
})
export class TreeAsyncSearchExample {
  readonly filterRemote = () => true
  readonly treeData = signal<readonly TreeDataNode<string, string>[]>([])
  readonly matches = signal<TreeSearchMatch[]>([])
  readonly selected = signal<string | undefined>(undefined)
  readonly path = signal<TreeAncestorResult | undefined>(undefined)
  readonly loading = signal(false)
  readonly locating = signal(false)
  private searchId = 0
  private pathId = 0
  private active = true
  readonly features = [
    expansionFeature<TreeDataNode<string, string>>(),
    asyncLoadFeature<TreeDataNode<string, string>>({
      loadChildren: async (item) => {
        const children = await loadRemoteTree(String(item.key))
        this.treeData.update((current) => updateRemoteChildren(current, String(item.key), children))
        return children
      },
    }),
  ]
  readonly rootOptions = computed(() => ({ treeData: this.treeData(), features: this.features }))
  readonly pathOptions = computed(() => ({
    treeData: this.path()?.treeData ?? [],
    defaultExpandedKeys: this.path()?.expandedKeys ?? [],
    features: [expansionFeature<TreeDataNode<string, string>>()],
  }))
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      this.active = false
      this.searchId++
      this.pathId++
    })
    void loadRemoteTree().then((roots) => {
      if (this.active) this.treeData.set(roots)
    })
  }
  async search(keyword: string) {
    const request = ++this.searchId
    this.loading.set(true)
    const result = await searchRemoteTree(keyword)
    if (request !== this.searchId) return
    this.matches.set(result)
    this.loading.set(false)
  }
  async choose(value: unknown) {
    const request = ++this.pathId
    this.searchId++
    this.loading.set(false)
    this.path.set(undefined)
    if (typeof value !== 'string') {
      this.selected.set(undefined)
      this.matches.set([])
      this.locating.set(false)
      return
    }
    this.selected.set(value)
    this.locating.set(true)
    const result = await loadRemoteAncestors(value)
    if (request !== this.pathId) return
    this.path.set(result)
    this.locating.set(false)
  }
}
