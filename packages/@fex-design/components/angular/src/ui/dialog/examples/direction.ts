import { Component } from '@angular/core'
import { Dialog } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'dialog-direction-example',
  standalone: true,
  imports: [Dialog, Button],
  templateUrl: './direction.html',
})
export class DialogDirectionExample {
  open = false
  direction: 'ltr' | 'rtl' = 'ltr'
}
