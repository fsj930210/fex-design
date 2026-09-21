import { Component } from '@angular/core'
import { Avatar, AvatarFallback, AvatarImage } from '../avatar'
@Component({
  selector: 'avatar-basic-example',
  standalone: true,
  imports: [Avatar, AvatarImage, AvatarFallback],
  template:
    '<avatar><avatar-image src="https://github.com/shadcn.png" alt="shadcn avatar" /><avatar-fallback>FX</avatar-fallback></avatar>',
})
export class BasicExample {}
