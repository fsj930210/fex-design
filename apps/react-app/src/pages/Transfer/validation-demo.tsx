import {
  FormRoot,
  FormField,
  FormGroup,
  FormLegend,
  FormControl,
  FormError,
  useForm,
} from '@fex-design/react/primitive/form'
import { Button } from '@fex-design/react/ui/button'
import { Transfer } from '@fex-design/react/primitive/transfer'
import { transferFieldNames, transferMembers } from './data'
import { TransferDemoSection } from './demo-section'

export function ValidationTransferDemo() {
  const form = useForm({
    defaultValues: { members: [] as readonly (string | number)[] },
    onSubmit: () => undefined,
  })
  return (
    <TransferDemoSection
      title="Form validation states"
      description="提交空值显示错误，选择一位成员显示业务警告。"
    >
      <FormRoot form={form}>
        <FormField
          name="members"
          validators={{
            onSubmit: ({ value }) =>
              (value as readonly (string | number)[]).length ? undefined : '请至少选择一位成员',
          }}
        >
          {(field) => (
            <FormGroup>
              <FormLegend>项目成员</FormLegend>
              <FormControl
                valuePropName="targetKeys"
                getValueProps={(value) => {
                  const keys = value as readonly (string | number)[]
                  const errors = field.state.meta.errors
                  return {
                    targetKeys: keys,
                    validation: errors.length
                      ? { status: 'error', message: String(errors[0]) }
                      : keys.length === 1
                        ? { status: 'warning', message: '建议增加一位备用成员' }
                        : undefined,
                  }
                }}
              >
                <Transfer items={transferMembers} fieldNames={transferFieldNames} />
              </FormControl>
              <FormError />
            </FormGroup>
          )}
        </FormField>
        <Button type="submit">校验成员</Button>
      </FormRoot>
    </TransferDemoSection>
  )
}
