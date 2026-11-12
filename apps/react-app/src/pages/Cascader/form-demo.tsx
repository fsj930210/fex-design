import type { ComponentProps } from 'react'
import {
  FormRoot,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormError,
  useForm,
} from '@fex-design/react/primitive/form'
import {
  CascaderContent,
  CascaderPanel,
  CascaderRoot,
  CascaderTrigger,
} from '@fex-design/react/primitive/cascader'
import { Button } from '@fex-design/react/ui/button'
import { regionOptions } from './data'
import { DemoSection } from './demo-section'

type RegionControlProps = Omit<ComponentProps<typeof CascaderTrigger>, 'onChange'> & {
  value?: string[]
  onChange?: (value: string[]) => void
}
function RegionControl({ value, onChange, ...props }: RegionControlProps) {
  return (
    <CascaderRoot
      options={regionOptions}
      value={value}
      onChange={(next) => onChange?.((next ?? []) as string[])}
    >
      <CascaderTrigger {...props} />
      <CascaderContent>
        <CascaderPanel />
      </CascaderContent>
    </CascaderRoot>
  )
}
export function FormDemo() {
  const form = useForm({ defaultValues: { region: [] as string[] }, onSubmit: () => undefined })
  return (
    <DemoSection title="Form validation" description="提交空值，观察地区字段错误。">
      <FormRoot form={form}>
        <FormField
          name="region"
          validators={{
            onSubmit: ({ value }) => ((value as string[]).length ? undefined : '请选择所在地区'),
          }}
        >
          <FormItem>
            <FormLabel required>所在地区</FormLabel>
            <FormControl>
              <RegionControl />
            </FormControl>
            <FormError />
          </FormItem>
        </FormField>
        <Button type="submit">提交校验</Button>
      </FormRoot>
    </DemoSection>
  )
}
