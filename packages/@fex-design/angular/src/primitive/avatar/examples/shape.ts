import { Component } from '@angular/core'
import { Avatar, AvatarFallback } from '../avatar'
@Component({
  selector: 'avatar-shape-example',
  standalone: true,
  imports: [Avatar, AvatarFallback],
  template:
    '<div class="flex items-center gap-3"><avatar shape="circle"><avatar-fallback>CI</avatar-fallback></avatar><avatar shape="square"><avatar-fallback>SQ</avatar-fallback></avatar></div>',
})
export class ShapeExample {}
