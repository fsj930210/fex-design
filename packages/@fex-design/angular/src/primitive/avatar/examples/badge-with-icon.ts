import { Component } from '@angular/core'
import { PlusIcon } from '@fex-design/angular/icon/plus'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '../avatar'
@Component({
  selector: 'avatar-badge-icon-example',
  standalone: true,
  imports: [Avatar, AvatarBadge, AvatarImage, AvatarFallback, PlusIcon],
  template:
    '<avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback><avatar-badge class="rounded-sm bg-foreground text-background" aria-label="Add"><plus-icon /></avatar-badge></avatar>',
})
export class BadgeWithIconExample {}
