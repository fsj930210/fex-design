import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
import { JsonPipe } from '@angular/common'
import { injectForm, type AnyFormState } from '@tanstack/angular-form'
import { Form, FormField, FormSubscribe } from '@fex-design/angular/ui/form'
import { Input } from '@fex-design/angular/ui/input'
import { Button } from '@fex-design/angular/ui/button'
const nameRule = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请输入昵称'
const signatureRule = ({ value }: { value: unknown }) =>
  String(value).trim().length >= 10 ? undefined : '签名至少需要 10 个字符'
@Component({
  selector: 'section[formContextOnlyExample]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Form, FormField, FormSubscribe, Input, Button, JsonPipe],
  host: { class: 'contents' },
  template: `
    <section class="mx-auto grid w-full max-w-xl gap-5 p-5">
      <header class="grid gap-1">
        <h3 class="text-base font-semibold">个人资料面板：只提供上下文</h3>
        <p class="text-sm text-muted-foreground">
          业务面板组织内容和操作按钮，Form 只提供字段上下文，不输出原生 form。保存按钮直接调用
          TanStack handleSubmit，恢复按钮调用 reset。
        </p>
      </header>
      <div uiForm [form]="form" class="contents">
        <div class="grid gap-4 rounded-md border border-border p-4" aria-label="个人资料编辑区">
          <ng-template #nicknameLabel>昵称</ng-template
          ><ng-template #nicknameDescription>这项资料只在当前面板中编辑。</ng-template>
          <div
            formField
            [tanstackField]="form"
            name="nickname"
            [label]="nicknameLabel"
            [description]="nicknameDescription"
            required
            [validators]="nameValidators"
            #nickname="field"
          >
            <div
              input
              [value]="nickname.api.state.value"
              (onChange)="nickname.api.handleChange($any($event).target.value)"
              (focusout)="nickname.api.handleBlur()"
            ></div>
          </div>
          <ng-template #signatureLabel>个人签名</ng-template
          ><ng-template #signatureDescription
            >至少 10 个字符，错误消息仍由 FormError 展示。</ng-template
          >
          <div
            formField
            [tanstackField]="form"
            name="signature"
            [label]="signatureLabel"
            [description]="signatureDescription"
            required
            [validators]="signatureValidators"
            #signature="field"
          >
            <div
              input
              [value]="signature.api.state.value"
              (onChange)="signature.api.handleChange($any($event).target.value)"
              (focusout)="signature.api.handleBlur()"
            ></div>
          </div>
        </div>
        <div class="flex flex-wrap gap-3">
          <button
            button
            type="button"
            variant="solid"
            color="primary"
            (click)="form.handleSubmit()"
          >
            保存签名
          </button>
          <button button type="button" (click)="resetProfile()">恢复初始资料</button>
        </div>
        <ng-template [formSubscribe]="values" let-current>
          <pre class="overflow-auto rounded-md bg-muted-background p-3 text-sm">{{
            current | json
          }}</pre>
        </ng-template>
      </div>
      <p role="status" class="text-sm text-muted-foreground">{{ result() }}</p>
    </section>
  `,
})
export class ContextOnlyExample {
  readonly result = signal('')
  readonly nameValidators = { onChange: nameRule }
  readonly signatureValidators = { onChange: signatureRule }
  readonly form = injectForm({
    defaultValues: { nickname: '小林', signature: '' },
    onSubmit: ({ value }) => {
      this.result.set('已保存 ' + value.nickname + ' 的个人签名')
    },
  })
  readonly values = (state: AnyFormState) => state.values
  resetProfile() {
    this.form.reset()
    this.result.set('')
  }
}
