import { Checkbox, CheckboxGroup } from '@fex-design/react/ui/checkbox'

export default function Example() {
  return (
    <div className="grid gap-3">
      <Checkbox aria-invalid="true" aria-describedby="checkbox-error">
        同意服务条款
      </Checkbox>
      <p id="checkbox-error" className="text-sm text-destructive">
        继续前必须同意服务条款。
      </p>
    </div>
  )
}
