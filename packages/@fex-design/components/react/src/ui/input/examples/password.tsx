import { InputPassword } from '@fex-design/react/ui/input'
export function PasswordExample() {
  return (
    <div className="grid w-full gap-3">
      <InputPassword defaultValue="secret" />
      <InputPassword placeholder="无切换按钮" visibilityToggle={false} />
      <InputPassword clearable aria-invalid="true" defaultValue="wrong-password" />
    </div>
  )
}
