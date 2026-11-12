import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, type AnyFormState } from '@tanstack/angular-form'
import { Form, FormSubscribe } from '@fex-design/angular/ui/form'
import { Button } from '@fex-design/angular/ui/button'
import { AddressFields } from './_address-fields'
@Component({
  selector: 'section[formFieldPrefixExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormSubscribe, Button, AddressFields, JsonPipe],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">复用带路径前缀的地址字段组</h3>
        <p class="text-sm text-muted-foreground">
          同一个地址组件分别接收 shipping 和 billing 前缀，显式组成字段路径。两组共用一个 TanStack
          实例，值和校验分别归属各自路径。
        </p>
      </header>
      <form uiForm [form]="form">
        <div addressFields prefix="shipping" legend="寄送地址"></div>
        <div addressFields prefix="billing" legend="账单地址"></div>
        <div class="flex flex-wrap gap-3">
          <button button type="button" (click)="copyAddress()">复制寄送地址到账单</button
          ><button button type="submit" variant="solid" color="primary">保存两组地址</button
          ><button button type="button" (click)="resetAddresses()">重置两组地址</button>
        </div>
        <ng-template [formSubscribe]="values" let-current>
          <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
            current | json
          }}</pre>
        </ng-template>
      </form>
      <p role="status" class="text-sm text-muted-foreground">{{ result() }}</p>
    </section>
  `,
})
export class FieldPrefixExample {
  readonly result = signal('')
  readonly form = injectForm({
    defaultValues: {
      shipping: { city: '上海', street: '' },
      billing: { city: '杭州', street: '' },
    },
    onSubmit: () => {
      this.result.set('已保存寄送地址和账单地址')
    },
  })
  readonly values = (state: AnyFormState) => state.values
  copyAddress() {
    this.form.setFieldValue('billing', { ...this.form.state.values.shipping })
  }
  resetAddresses() {
    this.form.reset()
    this.result.set('')
  }
}
