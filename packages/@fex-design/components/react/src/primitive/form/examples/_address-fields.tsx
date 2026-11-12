import {
  FormField,
  FormGroup,
  FormLegend,
  FormLabel,
  FormControl,
  FormError,
} from '@fex-design/react/primitive/form'
import { InputRoot, InputControl } from '@fex-design/react/primitive/input'
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写地址信息'
interface AddressFieldsProps {
  prefix: 'shipping' | 'billing'
  legend: string
}
export function AddressFields({ prefix, legend }: AddressFieldsProps) {
  return (
    <FormGroup className="rounded-lg bg-muted-background p-4">
      <FormLegend>{legend}</FormLegend>
      <p className="text-xs font-mono text-muted-foreground">字段前缀：{prefix}</p>
      <FormField name={`${prefix}.city`} validators={{ onChange: requiredText }}>
        {(field) => (
          <>
            <FormLabel required>城市</FormLabel>
            <FormControl>
              <InputRoot value={field.state.value} onChange={(value) => field.handleChange(value)}>
                <InputControl onBlur={() => field.handleBlur()} />
              </InputRoot>
            </FormControl>
            <FormError />
          </>
        )}
      </FormField>
      <FormField name={`${prefix}.street`} validators={{ onChange: requiredText }}>
        {(field) => (
          <>
            <FormLabel required>街道地址</FormLabel>
            <FormControl>
              <InputRoot value={field.state.value} onChange={(value) => field.handleChange(value)}>
                <InputControl onBlur={() => field.handleBlur()} />
              </InputRoot>
            </FormControl>
            <FormError />
          </>
        )}
      </FormField>
    </FormGroup>
  )
}
