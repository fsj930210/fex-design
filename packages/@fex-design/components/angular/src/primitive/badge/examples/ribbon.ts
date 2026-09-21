import { BadgeRibbon } from '@fex-design/angular/primitive/badge'
import { ChangeDetectionStrategy, Component } from '@angular/core'

@Component({
  selector: 'badge-ribbon-example',
  standalone: true,
  imports: [BadgeRibbon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ribbon.html',
})
export class Ribbon {}
