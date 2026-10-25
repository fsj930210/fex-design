import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tree } from '@fex-design/angular/ui/tree'
import { treeDemoData } from './_data/tree-demo'
@Component({
  selector: 'div[treeSemanticStylesExample]',
  standalone: true,
  host: { class: 'block w-full min-w-0' },
  imports: [Tree],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class TreeSemanticStylesExample {
  readonly treeProps = {
    treeData: treeDemoData.slice(0, 1),
    defaultExpandedKeys: ['root-1', 'root-1-group-1'],
  }
  readonly classNames = {
    root: 'w-full bg-slate-50',
    viewport: 'h-64 overflow-y-auto',
    title: 'font-medium',
    trigger: 'text-violet-600',
  }
  readonly styles = {
    root: 'padding:12px;border-radius:12px',
    title: 'color:#7c3aed',
    item: 'column-gap:12px',
  }
}
