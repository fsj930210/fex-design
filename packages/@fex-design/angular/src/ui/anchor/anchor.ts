import { NgTemplateOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core'
import type { AnchorClassNames, AnchorItem as AnchorItemData, AnchorStyles } from '@fex-design/core/anchor/types'
import { anchorRootClassName } from '@fex-design/styles/anchor'
import { cn } from '@fex/utils'
import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '../../primitive/anchor/anchor'
import { createHostClassName } from '../../signals/host-class'

@Component({
  selector: 'nav[anchor]',
  standalone: true,
  imports: [AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, NgTemplateOutlet],
  hostDirectives: [{
    directive: AnchorRoot,
    inputs: ['activeKeys', 'defaultActiveKeys', 'activeMode', 'orientation', 'container', 'targetOffset', 'threshold', 'behavior'],
    outputs: ['change'],
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './anchor.html',
  host: { '[class]': 'hostClassName()', '[style]': 'styles().root' },
})
export class Anchor {
  readonly items = input.required<readonly AnchorItemData<string>[]>()
  readonly classNames = input<AnchorClassNames>({})
  readonly styles = input<AnchorStyles<string>>({})
  readonly itemClick = output<{ event: MouseEvent; item: AnchorItemData<string> }>()
  private readonly root = inject(AnchorRoot)
  protected readonly hostClassName = createHostClassName(() =>
    cn(anchorRootClassName({ orientation: this.root.orientation() }), this.classNames().root),
  )
}

export type { AnchorClassNames, AnchorItemData, AnchorStyles }
