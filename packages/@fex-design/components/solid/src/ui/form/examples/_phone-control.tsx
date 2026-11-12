import { Input } from '@fex-design/solid/ui/input'
import { Button } from '@fex-design/solid/ui/button'
export interface PhoneValue {
  countryCode: '+86' | '+852'
  number: string
}
interface PhoneControlProps {
  value: PhoneValue
  onChange: (value: PhoneValue) => void
  onBlur: () => void
}
export function PhoneControl(props: PhoneControlProps) {
  return (
    <div class="grid grid-cols-[auto_1fr] items-center gap-2">
      <Button
        type="button"
        aria-label="切换区号"
        onClick={() =>
          props.onChange({
            countryCode: props.value.countryCode === '+86' ? '+852' : '+86',
            number: '',
          })
        }
      >
        {props.value.countryCode}
      </Button>
      <Input
        value={props.value.number}
        onChange={(event) => props.onChange({ ...props.value, number: event.currentTarget.value })}
        onBlur={props.onBlur}
        placeholder="请输入号码"
      />
    </div>
  )
}
