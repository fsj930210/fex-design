import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({selector: 'dialog-advanced-example', standalone: true, imports: [Dialog, DialogTrigger, Button], templateUrl: './advanced.html'})
export class DialogAdvancedExample { minimized = false; maximized = false; position = { x: 0, y: 0 }; private start = { x: 0, y: 0 }; private moving = false
  dragStart(event: PointerEvent) { this.moving = true; this.start = { x: event.clientX - this.position.x, y: event.clientY - this.position.y } }
  dragMove(event: PointerEvent) { if (this.moving) this.position = { x: event.clientX - this.start.x, y: event.clientY - this.start.y } }
  dragEnd() { this.moving = false }
  contentStyle() { return `transform:translate(calc(-50% + ${this.position.x}px),calc(-50% + ${this.position.y}px))` }
}
