import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { treeDndDemoData } from './_data/tree-demo'
import { createTreeDemoService } from './_data/tree-edit-demo'
@Component({
  selector: 'tree-dnd-example',
  standalone: true,
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dnd.html',
})
export class TreeDndExample {
  private readonly service = createTreeDemoService(treeDndDemoData)
  readonly treeData = signal<readonly Record<string, unknown>[]>(treeDndDemoData)
  readonly expandedKeys = signal<readonly (string | number)[]>(['root-1', 'root-1-group-1'])
  readonly busy = signal(false)
  readonly message = signal(
    'Item 1.1.2 不可拖动；Item 1.1.3 不可放置。放置后调用接口并重新获取树。',
  )

  readonly handleDrop = async ({
    sourceItem,
    targetItem,
    intent,
  }: Parameters<Tree<Record<string, unknown>>['drop']['emit']>[0]) => {
    if (!intent?.valid || this.busy()) return
    this.busy.set(true)
    this.message.set('正在提交移动并重新获取树…')
    try {
      await this.service.move({
        sourceKey: intent.sourceKey,
        parentKey: intent.parentKey,
        index: intent.index,
      })
      this.treeData.set(await this.service.fetchTree())
      if (intent.position === 'inside')
        this.expandedKeys.update((keys) =>
          keys.includes(intent.targetKey) ? keys : [...keys, intent.targetKey],
        )
      this.message.set(
        String(sourceItem?.title) + ' → ' + String(targetItem?.title) + '；已更新外部 treeData',
      )
    } catch (error) {
      this.message.set(error instanceof Error ? error.message : '移动失败，保留原数据')
    } finally {
      this.busy.set(false)
    }
  }
}
