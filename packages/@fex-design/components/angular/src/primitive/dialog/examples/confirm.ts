import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
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
  selector: 'dialog-confirm-primitive-example',
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
  templateUrl: './confirm.html',
})
export class DialogConfirmExample {
  readonly messageClassName = dialogMessageClassName
  result = '尚未操作'
  open = false
}
