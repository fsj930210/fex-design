import { BadgeRibbon } from '@fex-design/angular/ui/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-ui-ribbon-example',
  standalone: true,
  imports: [BadgeRibbon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ribbon.html',
})
export class Ribbon {}
