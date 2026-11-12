import { FormField, FormGroup } from '@fex-design/solid/ui/form'
import { Input } from '@fex-design/solid/ui/input'
const requiredText = ({ value }: { value: unknown }) =>
  String(value).trim() ? undefined : '请填写地址信息'
interface AddressFieldsProps {
  prefix: 'shipping' | 'billing'
  legend: string
}
export function AddressFields(props: AddressFieldsProps) {
  return (
    <FormGroup class="rounded-lg bg-muted-background p-4" legend={props.legend}>
      <p class="text-xs font-mono text-muted-foreground">字段前缀：{props.prefix}</p>
      <FormField
        name={`${props.prefix}.city`}
        label="城市"
        required
        validators={{ onChange: requiredText }}
      >
        {(field) => (
          <Input
            value={field().state.value}
            onChange={(event) => field().handleChange(event.currentTarget.value)}
            onBlur={() => field().handleBlur()}
          />
        )}
      </FormField>
      <FormField
        name={`${props.prefix}.street`}
        label="街道地址"
        required
        validators={{ onChange: requiredText }}
      >
        {(field) => (
          <Input
            value={field().state.value}
            onChange={(event) => field().handleChange(event.currentTarget.value)}
            onBlur={() => field().handleBlur()}
          />
        )}
      </FormField>
    </FormGroup>
  )
}
