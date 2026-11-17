import { Component } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
import { Resize } from '@fex-design/angular/directives/resize'
import {
  DialogRoot,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogActions,
  DialogClose,
  DialogBody,
  DialogFooter,
} from '@fex-design/angular/primitive/dialog'
@Component({
  selector: 'dialog-resize-primitive-example',
  standalone: true,
  imports: [
    Button,
    Resize,
    DialogRoot,
    DialogPortal,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogActions,
    DialogClose,
    DialogBody,
    DialogFooter,
  ],
  templateUrl: './resize.html',
})
export class DialogResizeExample {
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
  resize(next: typeof this.rect) {
    this.rect = next
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
