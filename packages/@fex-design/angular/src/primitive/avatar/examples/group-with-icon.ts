import { Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '../avatar'
@Component({
  selector: 'avatar-group-icon-example',
  standalone: true,
  imports: [Avatar, AvatarGroup, AvatarGroupCount, AvatarImage, AvatarFallback, PlusIcon],
  template:
    '<avatar-group><avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback></avatar><avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback></avatar><avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback></avatar><avatar-group-count aria-label="Add avatar"><plus-icon /></avatar-group-count></avatar-group>',
})
export class GroupWithIconExample {}
