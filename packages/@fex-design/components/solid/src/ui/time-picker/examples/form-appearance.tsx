import { TimePickerBasicExample as BasicExample } from './basic'

export function FormAppearanceExample() {
  return (
    <div class="grid w-full gap-6">
      <section class="grid gap-2 ">
        <p>默认</p>
        <BasicExample />
      </section>
      <section class="grid gap-2 form-error">
        <p>表单校验失败的外观</p>
        <BasicExample />
      </section>
      <section class="grid gap-2 form-warning">
        <p>表单警告的外观</p>
        <BasicExample />
      </section>
      <section class="grid gap-2 form-error [--form-error-color:var(--color-purple-600)]">
        <p>快速定制：紫色错误边框与光环</p>
        <BasicExample />
      </section>
      <p class="text-sm text-muted-foreground">校验规则、反馈文字和何时切换样式由表单控制。</p>
    </div>
  )
}
