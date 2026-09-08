import { Input } from '@fex-design/react/ui/input'
export function VariantsExample() {
  return (
    <div className="grid w-full gap-3">
      {(['outlined', 'filled', 'borderless', 'underlined'] as const).map((variant) => (
        <Input key={variant} variant={variant} placeholder={variant} />
      ))}
    </div>
  )
}
