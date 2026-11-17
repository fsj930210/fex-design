import { Component, inject, signal } from '@angular/core'
import { DialogService } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'dialog-alert-ui-example',
  standalone: true,
  imports: [Button],
  templateUrl: './alert.html',
})
export class DialogAlertExample {
  private readonly dialog = inject(DialogService)
  readonly result = signal('尚未操作')
  async show() {
    const handle = this.dialog.alert({ title: '操作成功', content: '资料已经保存，可以继续操作。' })
    this.result.set((await handle.result) ? '已确认' : '已取消')
  }
}
