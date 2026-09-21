import { InputControl, InputRoot } from '@fex-design/react/primitive/input'
export function SizesExample() {
  return (
    <div className="grid w-full gap-3">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <InputRoot key={size} size={size}>
          <InputControl placeholder={size} />
        </InputRoot>
      ))}
    </div>
  )
}
