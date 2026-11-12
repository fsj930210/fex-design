import { FormField, FormGroup } from '@fex-design/react/ui/form'
import { Input } from '@fex-design/react/ui/input'
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写地址信息'
interface AddressFieldsProps {
  prefix: 'shipping' | 'billing'
  legend: string
}
export function AddressFields({ prefix, legend }: AddressFieldsProps) {
  return (
    <FormGroup className="rounded-lg bg-muted-background p-4" legend={legend}>
      <p className="text-xs font-mono text-muted-foreground">字段前缀：{prefix}</p>
      <FormField
        name={`${prefix}.city`}
        label="城市"
        required
        validators={{ onChange: requiredText }}
      >
        {(field) => (
          <Input
            value={field.state.value}
            onChange={(event) => field.handleChange(event.currentTarget.value)}
            onBlur={() => field.handleBlur()}
          />
        )}
      </FormField>
      <FormField
        name={`${prefix}.street`}
        label="街道地址"
        required
        validators={{ onChange: requiredText }}
      >
        {(field) => (
          <Input
            value={field.state.value}
            onChange={(event) => field.handleChange(event.currentTarget.value)}
            onBlur={() => field.handleBlur()}
          />
        )}
      </FormField>
    </FormGroup>
  )
}
