import { NgTemplateOutlet } from '@angular/common'
import { Component, DestroyRef, inject, signal } from '@angular/core'
import type { TemplateRef } from '@angular/core'
import { DialogService, type DialogRequestHandle } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
type Mode = 'update' | 'destroy' | 'destroyAll'
@Component({
  selector: 'dialog-methods-ui-example',
  standalone: true,
  imports: [Button, NgTemplateOutlet],
  templateUrl: './methods.html',
})
export class DialogMethodsExample {
  private readonly dialog = inject(DialogService)
  private readonly active = new Set<DialogRequestHandle>()
  private handles: DialogRequestHandle[] = []
  readonly feedback = signal('请选择一个操作')
  mode: Mode = 'update'
  constructor() {
    inject(DestroyRef).onDestroy(() => {
      for (const handle of this.active) handle.destroy()
    })
  }
  update(index: number, functional = false) {
    const handle = this.handles[index]
    if (!handle) return
    if (functional)
      handle.update((previous) => ({
        title: (typeof previous.title === 'string' ? previous.title : '实例') + '（函数更新）',
        content: '通过前一次配置更新完成。',
        okBtnProps: { ...previous.okBtnProps, content: '完成' },
      }))
    else
      handle.update({
        title: '更新后的标题',
        content: '正文和确定按钮已更新。',
        okBtnProps: { content: '完成' },
      })
  }
  destroy(index: number) {
    if (this.mode === 'destroyAll') this.dialog.destroyAll()
    else this.handles[index]?.destroy()
  }
  show(mode: Mode, first: TemplateRef<unknown>, second: TemplateRef<unknown>) {
    for (const handle of this.active) handle.destroy()
    this.active.clear()
    this.handles = []
    this.mode = mode
    const count = mode === 'destroyAll' ? 2 : 1
    for (let index = 0; index < count; index++) {
      const handle = this.dialog.confirm({
        title: '实例 ' + (index + 1),
        content: index === 0 ? first : second,
      })
      this.handles.push(handle)
      this.active.add(handle)
      void handle.result.then(() => {
        this.active.delete(handle)
        this.feedback.set('剩余弹窗：' + this.active.size)
      })
    }
    this.feedback.set('已打开 ' + count + ' 个弹窗')
  }
}
