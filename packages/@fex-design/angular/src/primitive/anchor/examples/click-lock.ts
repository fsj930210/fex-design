import { ChangeDetectionStrategy, Component } from '@angular/core'
import { AnchorIndicator, AnchorItem, AnchorLink, AnchorList, AnchorRail, AnchorRoot } from '../anchor'

@Component({
  selector: 'anchor-click-lock-example',
  standalone: true,
  imports: [AnchorRoot, AnchorRail, AnchorIndicator, AnchorList, AnchorItem, AnchorLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './click-lock.html',
})
export class AnchorClickLockExample {}
