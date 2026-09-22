import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from '@fex-design/react/primitive/select'
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
]
export default function Example() {
  return (
    <SelectRoot options={options} defaultValue="react">
      <SelectTrigger
        className="w-72"
        inputProps={{
          classNames: { root: 'rounded-xl', control: 'font-semibold', suffix: 'text-violet-600' },
          styles: { root: { borderColor: '#8b5cf6' }, control: { letterSpacing: '0.04em' } },
        }}
      />
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  )
}
