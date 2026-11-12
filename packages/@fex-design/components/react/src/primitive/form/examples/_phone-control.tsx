import { InputRoot, InputControl } from '@fex-design/react/primitive/input'
import { Button } from '@fex-design/react/primitive/button'
export interface PhoneValue {
  countryCode: '+86' | '+852'
  number: string
}
interface PhoneControlProps {
  value: PhoneValue
  onChange: (value: PhoneValue) => void
  onBlur: () => void
}
export function PhoneControl({ value, onChange, onBlur }: PhoneControlProps) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-center gap-2">
      <Button
        type="button"
        aria-label="切换区号"
        onClick={() =>
          onChange({ countryCode: value.countryCode === '+86' ? '+852' : '+86', number: '' })
        }
      >
        {value.countryCode}
      </Button>
      <InputRoot value={value.number} onChange={(number) => onChange({ ...value, number })}>
        <InputControl onBlur={onBlur} placeholder="请输入号码" />
      </InputRoot>
    </div>
  )
}
