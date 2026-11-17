import { Component } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Button } from '@fex-design/angular/primitive/button'
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
@Component({
  selector: 'dialog-nested-primitive-example',
  standalone: true,
  imports: [
    Button,
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
  ],
  templateUrl: './nested.html',
})
export class DialogNestedExample {
  open = false
  innerOpen = false
  name = ''
  error = ''
  result = '尚未提交'
  setOpen(event: unknown, inner = false) {
    const value = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
    if (inner) this.innerOpen = value
    else this.open = value
  }
  submit() {
    if (!this.name.trim()) {
      this.error = '请输入姓名'
      return
    }
    this.result = '已保存：' + this.name.trim()
    this.error = ''
    this.open = false
  }
}
