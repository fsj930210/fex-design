import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'dialog-overlay-example',
  standalone: true,
  imports: [Dialog, DialogTrigger, Button],
  templateUrl: './overlay.html',
})
export class DialogOverlayExample {
  modal = true
  overlay = true
  closable = false
  open = false

  onOpenChange(event: unknown) {
    this.open = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
  }
}
