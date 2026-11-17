import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'dialog-custom-footer-example',
  standalone: true,
  imports: [Dialog, DialogTrigger, Button],
  templateUrl: './custom-footer.html',
})
export class DialogCustomFooterExample {
  open = false
  onOpenChange(event: unknown) {
    this.open = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
  }
}
