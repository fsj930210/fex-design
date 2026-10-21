import { Select } from '@fex-design/solid/ui/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
const inputProps = {
  classNames: { root: 'rounded-xl', control: 'font-semibold', suffix: 'text-violet-600' },
  styles: { root: { 'border-color': '#8b5cf6' }, control: { 'letter-spacing': '0.04em' } },
}
const valueProps = {
  tagProps: { color: '#7c3aed', class: 'rounded-md font-semibold' },
  overflowTagProps: { color: '#0891b2', class: 'rounded-md font-semibold' },
  tagActionProps: { class: 'rounded-sm text-violet-700 hover:bg-violet-200' },
}
const triggerProps = { class: 'border-violet-300 bg-white text-violet-800 rounded-md' }
const contentProps = {
  class:
    'border-violet-300 bg-white text-violet-800 [--primary:#6d28d9] [--muted-background:#f5f3ff]',
}
export function SelectSemanticStylesExample() {
  return (
    <div class="grid w-full gap-4">
      <Select
        class="w-72 max-w-full"
        options={options}
        defaultValue="react"
        placeholder="请选择框架"
        inputProps={inputProps}
        triggerProps={triggerProps}
        contentProps={contentProps}
      />
      <Select
        class="w-72 max-w-full"
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
