import { Input, InputPassword, InputSearch } from '@fex-design/solid/ui/input'
export function SemanticStylesExample() {
  const classNames = {
    root: 'border-violet-300 hover:border-violet-400 focus-within:border-violet-600 focus-within:ring-violet-600/20',
    control: 'font-medium',
    prefix: 'text-violet-500',
    clear: 'hover:text-violet-700',
  }
  return (
    <div class="grid w-full gap-3">
      <Input prefix="@" defaultValue="structured" clearable classNames={classNames} />
      <InputPassword defaultValue="secret" classNames={{ action: 'text-violet-500' }} />
      <InputSearch
        defaultValue="主题"
        class="[--input-background:#faf5ff] [--input-border-color:#d8b4fe] [--input-ring-color:#9333ea]"
      />
    </div>
  )
}
