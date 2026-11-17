import { Component } from '@angular/core'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogActions,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogClose,
} from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'dialog-overlay-primitive-example',
  standalone: true,
  imports: [
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogActions,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogClose,
    Button,
  ],
  templateUrl: './overlay.html',
})
export class DialogOverlayExample {
  modal = true
  open = false
  overlay = true
  closable = false

  onOpenChange(event: unknown) {
    this.open = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
  }
}
