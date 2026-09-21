import { InputPassword } from '@fex-design/solid/ui/input'
export function PasswordExample() {
  return (
    <div class="grid w-full gap-3">
      <InputPassword defaultValue="secret" />
      <InputPassword placeholder="无切换按钮" visibilityToggle={false} />
      <InputPassword clearable aria-invalid="true" defaultValue="wrong-password" />
    </div>
  )
}
