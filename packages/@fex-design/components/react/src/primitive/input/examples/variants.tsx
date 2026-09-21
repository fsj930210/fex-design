import { InputControl, InputRoot } from '@fex-design/react/primitive/input'
export function VariantsExample() {
  return (
    <div className="grid w-full gap-3">
      {(['outlined', 'filled', 'borderless', 'underlined'] as const).map((variant) => (
        <InputRoot key={variant} variant={variant}>
          <InputControl placeholder={variant} />
        </InputRoot>
      ))}
    </div>
  )
}
