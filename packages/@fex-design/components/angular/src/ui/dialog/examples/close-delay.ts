import { Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { Dialog } from '@fex-design/angular/ui/dialog'
@Component({
  selector: 'dialog-close-delay-ui-example',
  standalone: true,
  imports: [Button, Dialog],
  templateUrl: './close-delay.html',
})
export class DialogCloseDelayExample {
  open = false
  delay = 200
  feedback = '尚未操作'
  get style() {
    return { '--dialog-motion-duration': (this.open ? 200 : this.delay) + 'ms' }
  }
  show(milliseconds: number) {
    this.delay = milliseconds
    this.open = true
    this.feedback = '外部设置 open=true'
  }
  onOpenChange(event: unknown) {
    const next = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
    this.open = next
    this.feedback = 'onOpenChange(' + next + ')'
  }
  close() {
    this.open = false
    this.feedback = '外部设置 open=false'
  }
}
