import { InputSearch } from '@fex-design/solid/ui/input'

export function InputCssVariablesExample() {
  return (
    <div class="grid w-full max-w-md gap-3">
      <p>Button: Before / After</p>
      <InputSearch
        class="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
        defaultValue="Design"
        addonBefore="Before"
        addonAfter="After"
        addonBeforeButtonProps={{ color: 'info', variant: 'filled' }}
        addonAfterButtonProps={{ color: 'success', variant: 'solid' }}
      />
    </div>
  )
}
