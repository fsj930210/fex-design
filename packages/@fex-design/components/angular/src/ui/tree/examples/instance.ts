import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core'
import { Tree, type TreeDataNode } from '@fex-design/angular/ui/tree'
import { Button } from '@fex-design/angular/ui/button'
import { treeDemoData } from './_data/tree-demo'
type Action = 'expand' | 'scroll' | 'select' | 'check' | 'path' | 'reset'
@Component({
  selector: 'tree-instance-example',
  standalone: true,
  imports: [Tree, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './instance.html',
})
export class TreeInstanceExample {
  readonly tree = viewChild<Tree<TreeDataNode<string, string>>>(Tree)
  readonly data = treeDemoData
  readonly message = signal('点击按钮调用 Tree 实例方法')
  readonly selected = signal<readonly (string | number)[]>([])
  readonly checked = signal<readonly (string | number)[]>([])
  run(action: Action) {
    const api = this.tree()
    if (!api) return
    const target = 'root-2-group-3-item-3'
    if (action === 'expand') {
      api.expand('root-2')
      api.expand('root-2-group-3')
      this.message.set('已展开 Department 2 和 Group 2.3')
    } else if (action === 'scroll') {
      const found = api.scrollTo(target, { reveal: true })
      this.message.set(found ? '已提交 Item 2.3.3 定位' : '目标节点未加载或不存在')
    } else if (action === 'select') {
      api.select(target)
      this.message.set('已追加选择 Item 2.3.3，保留其他选择')
    } else if (action === 'check') {
      api.check(target)
      this.message.set('已追加勾选 Item 2.3.3，保留其他勾选')
    } else if (action === 'path') {
      this.message.set(
        String(api.getNode(target)?.title) +
          '：' +
          api.getPath(target).join(' → ') +
          '；根节点数：' +
          api.getTreeData().length,
      )
    } else {
      api.clearSelection()
      api.clearChecked()
      api.collapseAll()
      this.message.set('已清空选择、勾选并收起全部节点')
    }
  }
}
