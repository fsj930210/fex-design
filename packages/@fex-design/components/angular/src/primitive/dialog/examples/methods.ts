import { Component } from '@angular/core'
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
import { dialogMessageClassName } from '@fex-design/components-styles/dialog'
type Id = 'first' | 'second'
type Mode = 'update' | 'destroy' | 'destroyAll'
type Slot = { open: boolean; title: string; content: string; updated: boolean }
const initial = (): Record<Id, Slot> => ({
  first: { open: false, title: '实例 1', content: '', updated: false },
  second: { open: false, title: '实例 2', content: '', updated: false },
})
@Component({
  selector: 'dialog-methods-primitive-example',
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
  templateUrl: './methods.html',
})
export class DialogMethodsExample {
  readonly ids: Id[] = ['first', 'second']
  readonly messageClassName = dialogMessageClassName
  slots = initial()
  mode: Mode = 'update'
  feedback = '请选择一个操作'
  show(mode: Mode) {
    this.mode = mode
    this.slots = initial()
    this.slots.first.open = true
    this.slots.second.open = mode === 'destroyAll'
    this.feedback = '已打开 ' + (mode === 'destroyAll' ? 2 : 1) + ' 个弹窗'
  }
  update(id: Id, functional = false) {
    const previous = this.slots[id]
    this.slots = {
      ...this.slots,
      [id]: {
        ...previous,
        title: functional ? previous.title + '（函数更新）' : '更新后的标题',
        content: functional ? '通过前一次配置更新完成。' : '正文和确定按钮已更新。',
        updated: true,
      },
    }
  }
  destroy(id: Id, all = false) {
    const next = { ...this.slots }
    for (const key of this.ids) if (all || key === id) next[key] = { ...next[key], open: false }
    this.slots = next
    this.feedback = '剩余弹窗：' + this.ids.filter((key) => next[key].open).length
  }
  setOpen(id: Id, event: unknown) {
    const open = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
    if (!open) this.destroy(id)
  }
}
