import { Component } from '@angular/core'
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from '../avatar'
@Component({
  selector: 'avatar-max-count-example',
  standalone: true,
  imports: [Avatar, AvatarGroup, AvatarGroupCount, AvatarFallback],
  template:
    '<avatar-group><avatar shape="square"><avatar-fallback>FX</avatar-fallback></avatar><avatar shape="square"><avatar-fallback>FX</avatar-fallback></avatar><avatar shape="square"><avatar-fallback>FX</avatar-fallback></avatar><avatar-group-count class="rounded-md">+3</avatar-group-count></avatar-group>',
})
export class MaxCountExample {}
