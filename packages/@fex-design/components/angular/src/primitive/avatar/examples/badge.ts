import { Component } from '@angular/core'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../avatar'
@Component({
  selector: 'avatar-badge-example',
  standalone: true,
  imports: [Avatar, AvatarBadge, AvatarImage, AvatarFallback],
  template:
    '<avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback><avatar-badge aria-label="Online" /></avatar>',
})
export class BadgeExample {}
