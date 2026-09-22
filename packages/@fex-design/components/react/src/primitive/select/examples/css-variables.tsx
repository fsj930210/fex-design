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
    <SelectRoot options={options}>
      <SelectTrigger className="w-72 [--input-background:#faf5ff] [--input-border-color:#c084fc] [--input-ring-color:#9333ea]" />
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
