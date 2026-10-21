import { ChangeDetectionStrategy, Component, ElementRef, viewChild } from '@angular/core'
import {
  AnchorIndicator,
  AnchorItem,
  AnchorLink,
  AnchorList,
  AnchorRail,
  AnchorRoot,
} from '@fex-design/angular/primitive/anchor'
@Component({
  selector: 'anchor-css-variables-example',
  standalone: true,
  imports: [AnchorRoot, AnchorRail, AnchorIndicator, AnchorList, AnchorItem, AnchorLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './css-variables.html',
})
export class AnchorCssVariablesExample {
  private readonly containerRef = viewChild.required<ElementRef<HTMLElement>>('container')
  protected readonly container = () => this.containerRef().nativeElement
}
