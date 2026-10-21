import { SelectRoot, SelectTrigger, SelectContent } from '@fex-design/solid/primitive/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
const inputProps = {}
const valueProps = {
  tagProps: { class: '[--tag-color:#7c3aed] [--tag-color-foreground:#ffffff]' },
  overflowTagProps: { class: '[--tag-color:#0891b2] [--tag-color-foreground:#ffffff]' },
  tagActionProps: { class: 'text-[var(--tag-color)]' },
}
const triggerProps = {
  class:
    '[--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]',
}
const contentProps = {
  class:
    '[--border:#c4b5fd] [--elevated-background:#ffffff] [--elevated-foreground:#6d28d9] [--primary:#6d28d9] [--muted-background:#f5f3ff]',
}
export function SelectCssVariablesExample() {
  return (
    <div class="grid w-full gap-4">
      <SelectRoot options={options}>
        <SelectTrigger
          {...triggerProps}
          class="w-72 max-w-full [--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
          inputProps={inputProps}
          placeholder="请选择框架"
        />
        <SelectContent {...contentProps} />
      </SelectRoot>
      <SelectRoot options={options} multiple defaultValue={['react', 'vue']}>
        <SelectTrigger
          {...triggerProps}
          class="w-72 max-w-full [--input-border-color:#c4b5fd] [--input-background:#ffffff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
          inputProps={inputProps}
          valueProps={valueProps}
          maxTagCount={1}
        />
        <SelectContent {...contentProps} />
      </SelectRoot>
    </div>
  )
}
