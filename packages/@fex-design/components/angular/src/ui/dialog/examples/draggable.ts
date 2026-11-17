import { Component } from '@angular/core'
import { Button } from '@fex-design/angular/ui/button'
import { Move } from '@fex-design/angular/directives/move'
import { Dialog } from '@fex-design/angular/ui/dialog'
@Component({
  selector: 'dialog-draggable-ui-example',
  standalone: true,
  imports: [Button, Move, Dialog],
  templateUrl: './draggable.html',
})
export class DialogDraggableExample {
  open = false
  rect = { x: 0, y: 0, width: 480, height: 300 }
  show() {
    const width = Math.min(480, window.innerWidth - 32)
    const height = Math.min(300, window.innerHeight - 64)
    this.rect = {
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
      width,
      height,
    }
    this.open = true
  }
  panel(element: HTMLElement) {
    return element.closest<HTMLElement>('[data-slot="dialog-content"]')
  }
  setOpen(event: unknown) {
    this.open = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
  }
  get position() {
    return { x: this.rect.x, y: this.rect.y }
  }
  move(point: { x: number; y: number }) {
    this.rect = { ...this.rect, ...point }
  }
  get style() {
    return {
      left: this.rect.x + 'px',
      top: this.rect.y + 'px',
      width: this.rect.width + 'px',
      height: this.rect.height + 'px',
      translate: 'none',
      transform: 'none',
      transitionProperty: 'opacity, scale',
      maxWidth: 'none',
      maxHeight: 'none',
      display: 'flex',
      flexDirection: 'column',
    }
  }
}
