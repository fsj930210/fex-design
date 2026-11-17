import type { TemplateRef } from '@angular/core'
import { Component, inject, signal } from '@angular/core'
import { DialogService } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'dialog-confirm-ui-example',
  standalone: true,
  imports: [Button],
  templateUrl: './confirm.html',
})
export class DialogConfirmExample {
  private readonly dialog = inject(DialogService)
  readonly result = signal('尚未操作')
  async show(title: TemplateRef<unknown>, content: TemplateRef<unknown>) {
    const handle = this.dialog.confirm({ title, content })
    this.result.set((await handle.result) ? '已确认' : '已取消')
  }
}
