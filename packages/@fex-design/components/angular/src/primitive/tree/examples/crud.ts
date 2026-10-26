import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import {
  TreeRoot,
  TreeViewport,
  TreeItem,
  createTreeSignals,
  expansionFeature,
  selectionFeature,
} from '@fex-design/angular/primitive/tree'
import { Button } from '@fex-design/angular/primitive/button'
import { TreeCrudRow } from './crud-row'
import { treeCrudData } from './_data/tree-crud-demo'
import { createTreeDemoService } from './_data/tree-edit-demo'
type CrudTree = ReturnType<typeof createTreeSignals<Record<string, unknown>>>['tree']
@Component({
  selector: 'tree-crud-example',
  standalone: true,
  imports: [TreeRoot, TreeViewport, TreeItem, Button, TreeCrudRow],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './crud.html',
})
export class TreeCrudExample {
  private readonly service = createTreeDemoService(treeCrudData)
  readonly treeData = signal<readonly Record<string, unknown>[]>(treeCrudData)
  readonly expandedKeys = signal<readonly (string | number)[]>(['department-1', 'group-1'])
  readonly busy = signal(false)
  readonly message = signal('修改接口成功后重新获取树，外部 treeData 是唯一数据源')
  readonly features = [
    expansionFeature<Record<string, unknown>>(),
    selectionFeature<Record<string, unknown>>(),
  ]
  readonly options = computed(() => ({
    treeData: this.treeData(),
    expandedKeys: this.expandedKeys(),
    onExpandedKeysChange: (keys: readonly (string | number)[]) => this.expandedKeys.set(keys),
    features: this.features,
  }))
  readonly tree = createTreeSignals(() => this.options()).tree
  private async run(operation: () => Promise<void>, success: string, parentKey?: string | number) {
    if (this.busy()) return
    this.busy.set(true)
    this.message.set('正在提交修改并重新获取树…')
    try {
      await operation()
      this.treeData.set(await this.service.fetchTree())
      if (parentKey !== undefined)
        this.expandedKeys.update((keys) => (keys.includes(parentKey) ? keys : [...keys, parentKey]))
      this.message.set(success)
    } catch (error) {
      this.message.set(error instanceof Error ? error.message : '操作失败，保留原数据')
    } finally {
      this.busy.set(false)
    }
  }
  addRoot() {
    return this.run(() => this.service.create(null), '已新增根节点，已重新获取 treeData')
  }
  save(key: string | number, title: string) {
    return this.run(() => this.service.rename(key, title), '已更新名称，已重新获取 treeData')
  }
  addChild(parentKey: string | number) {
    return this.run(
      () => this.service.create(parentKey),
      '已新增子节点，已重新获取 treeData',
      parentKey,
    )
  }
  remove(key: string | number) {
    return this.run(() => this.service.remove(key), '已删除节点，已重新获取 treeData')
  }
  toggle(api: CrudTree, key: string | number) {
    api.getFeature<{ toggle(key: string | number): void }>('expansion')?.toggle(key)
  }
}
