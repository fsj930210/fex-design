import { ChangeDetectionStrategy, Component, signal, viewChild } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { Button } from '@fex-design/angular/ui/button'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'tree-scroll-to-example',
  standalone: true,
  imports: [Tree, Button],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './scroll-to.html',
})
export class TreeScrollToExample {
  readonly data = treeDemoData
  readonly tree = viewChild<Tree<Record<string, unknown>>>(Tree)
  readonly message = signal('')
  locate() {
    const found = this.tree()?.scrollTo('root-2-group-3-item-3', { reveal: true })
    this.message.set(found ? '已定位 Item 2.3.3' : '未能定位目标节点')
  }
}
