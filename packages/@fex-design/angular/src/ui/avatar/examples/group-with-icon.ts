import { Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Avatar, AvatarGroup } from '@fex-design/angular/ui/avatar'

@Component({
  selector: 'avatar-ui-group-with-icon-example',
  standalone: true,
  imports: [Avatar, AvatarGroup, PlusIcon],
  templateUrl: './group-with-icon.html',
})
export class GroupWithIconExample {}
