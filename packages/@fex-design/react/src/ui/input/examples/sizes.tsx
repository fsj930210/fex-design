import { Input } from '@fex-design/react/ui/input'
export function SizesExample() {
  return (
    <div className="grid w-full gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Input key={size} size={size} placeholder={size} />
      ))}
    </div>
  )
}
