import { Component } from '@angular/core'
import { Avatar, AvatarGroup } from '@fex-design/angular/ui/avatar'
@Component({
  selector: 'avatar-ui-group-shape-example',
  standalone: true,
  imports: [Avatar, AvatarGroup],
  template:
    '<div avatarGroup><span avatar src="https://github.com/shadcn.png" fallback="FX"></span><span avatar src="https://github.com/shadcn.png" fallback="FX"></span><span avatar src="https://github.com/shadcn.png" fallback="FX"></span></div>',
})
export class GroupShapeExample {}
