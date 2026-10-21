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
  selector: 'anchor-semantic-styles-example',
  standalone: true,
  imports: [AnchorRoot, AnchorRail, AnchorIndicator, AnchorList, AnchorItem, AnchorLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './semantic-styles.html',
})
export class AnchorSemanticStylesExample {
  private readonly containerRef = viewChild.required<ElementRef<HTMLElement>>('container')
  protected readonly container = () => this.containerRef().nativeElement
}
