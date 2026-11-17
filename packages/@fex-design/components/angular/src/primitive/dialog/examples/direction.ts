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
  selector: 'dialog-direction-primitive-example',
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
  templateUrl: './direction.html',
})
export class DialogDirectionExample {
  open = false
  direction: 'ltr' | 'rtl' = 'ltr'
}
