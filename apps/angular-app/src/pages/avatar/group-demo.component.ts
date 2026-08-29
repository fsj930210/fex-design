import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Avatar, AvatarGroup } from '@fex-design/angular/ui/avatar'
import Card from '@fex-design/angular/ui/card'

@Component({
  selector: 'fex-avatar-group-demo',
  standalone: true,
  imports: [Card, Avatar, AvatarGroup],
  templateUrl: './group-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarGroupDemoComponent {
  protected readonly names = ['AM', 'BL', 'CS', 'DT', 'ER']
}
