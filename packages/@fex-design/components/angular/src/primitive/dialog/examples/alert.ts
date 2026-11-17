import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
import { Component } from '@angular/core'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/primitive/button'
@Component({
  selector: 'dialog-alert-primitive-example',
  standalone: true,
  imports: [
    DialogRoot,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    Button,
  ],
  templateUrl: './alert.html',
})
export class DialogAlertExample {
  readonly messageClassName = dialogMessageClassName
  result = '尚未操作'
  open = false
}
