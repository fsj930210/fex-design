import { Input } from '@fex-design/react/ui/input'
import { Button } from '@fex-design/react/ui/button'
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
      <Input
        value={value.number}
        onChange={(event) => onChange({ ...value, number: event.currentTarget.value })}
        onBlur={onBlur}
        placeholder="请输入号码"
      />
    </div>
  )
}
