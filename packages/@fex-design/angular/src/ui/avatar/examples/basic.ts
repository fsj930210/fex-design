import { Component } from '@angular/core'
import { Avatar } from '../avatar'

@Component({
  selector: 'avatar-ui-basic-example',
  standalone: true,
  imports: [Avatar],
  template: '<span avatar src="https://github.com/shadcn.png" alt="shadcn avatar" fallback="FX"></span>',
})
export class BasicExample {}
