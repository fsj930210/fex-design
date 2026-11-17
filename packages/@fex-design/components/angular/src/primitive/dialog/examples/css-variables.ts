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
  selector: 'dialog-css-variables-primitive-example',
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
  templateUrl: './css-variables.html',
})
export class DialogCssVariablesExample {
  open = false
}
