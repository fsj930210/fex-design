import { Component } from '@angular/core'
import { Avatar, AvatarFallback, AvatarGroup } from '../avatar'
@Component({
  selector: 'avatar-group-shape-example',
  standalone: true,
  imports: [Avatar, AvatarGroup, AvatarFallback],
  template:
    '<avatar-group><avatar shape="square"><avatar-fallback>FX</avatar-fallback></avatar><avatar shape="square"><avatar-fallback>FX</avatar-fallback></avatar><avatar shape="square"><avatar-fallback>FX</avatar-fallback></avatar></avatar-group>',
})
export class GroupShapeExample {}
