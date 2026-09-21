import { Component } from '@angular/core'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarImage } from '../avatar'
@Component({
  selector: 'avatar-group-count-example',
  standalone: true,
  imports: [Avatar, AvatarGroup, AvatarGroupCount, AvatarImage, AvatarFallback],
  template:
    '<avatar-group><avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback></avatar><avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback></avatar><avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback></avatar><avatar-group-count>+3</avatar-group-count></avatar-group>',
})
export class GroupCountExample {}
