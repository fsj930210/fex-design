import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core'
import { Anchor } from '@fex-design/angular/ui/anchor'
@Component({
  selector: 'anchor-css-variables-example',
  standalone: true,
  imports: [Anchor],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class AnchorCssVariablesExample {
  protected readonly items = [
    { key: 'overview', title: '概览', target: '#angular-ui-basic-overview' },
    {
      key: 'usage',
      title: '使用方式',
      target: '#angular-ui-basic-usage',
      children: [{ key: 'api', title: 'API', target: '#angular-ui-basic-api' }],
    },
  ]
  private readonly containerRef = viewChild.required<ElementRef<HTMLElement>>('container')
  protected readonly container = () => this.containerRef().nativeElement
}
