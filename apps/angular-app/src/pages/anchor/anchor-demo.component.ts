import { ChangeDetectionStrategy, Component, ElementRef, signal, viewChild } from '@angular/core'
import { Anchor, type AnchorItemData } from '@fex-design/angular/ui/anchor'
import { Card } from '@fex-design/angular/ui/card'

@Component({
  selector: 'anchor-demo',
  standalone: true,
  imports: [Card, Anchor],
  templateUrl: './anchor-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnchorDemo {
  protected readonly container = viewChild<ElementRef<HTMLElement>>('container')
  protected readonly activeKeys = signal<readonly string[]>([])
  protected readonly currentKeys = signal<readonly string[]>([])
  protected readonly items: AnchorItemData<string>[] = [
    { key: 'anchor-overview', title: 'Overview', target: '#anchor-overview' },
    {
      key: 'anchor-api',
      title: 'API',
      target: '#anchor-api',
      children: [{ key: 'anchor-props', title: 'Props', target: '#anchor-props' }],
    },
    { key: 'anchor-examples', title: 'Examples', target: '#anchor-examples' },
  ]
  protected readonly getContainer = () => this.container()?.nativeElement ?? window
}
