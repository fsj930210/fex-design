import { Select } from '@fex-design/react/ui/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
const inputProps = {}
const valueProps = {
  tagProps: { className: '[--tag-color:#7c3aed] [--tag-color-foreground:#ffffff]' },
  overflowTagProps: { className: '[--tag-color:#0891b2] [--tag-color-foreground:#ffffff]' },
  tagActionProps: { className: 'text-[var(--tag-color)]' },
}
const triggerProps = {
  className:
    '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
}
const contentProps = {
  className:
    '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
}
export function SelectCssVariablesExample() {
  return (
    <div className="grid w-full gap-4">
      <Select
        className="w-72 max-w-full"
        options={options}
        placeholder="请选择框架"
        inputProps={inputProps}
        triggerProps={triggerProps}
        contentProps={contentProps}
      />
      <Select
        className="w-72 max-w-full"
        options={options}
        multiple
        defaultValue={['react', 'vue']}
        maxTagCount={1}
        inputProps={inputProps}
        triggerProps={{ ...triggerProps, valueProps }}
        contentProps={contentProps}
      />
    </div>
  )
}
