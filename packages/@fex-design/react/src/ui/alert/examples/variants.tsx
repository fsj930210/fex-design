import { Alert } from '@fex-design/react/ui/alert'

export default function Variants() {
  return (
    <div className="grid w-full gap-3">
      <Alert variant="filled" showIcon title="Filled Alert" />
      <Alert variant="outlined" showIcon title="Outlined Alert" />
      <Alert variant="solid" showIcon title="Solid Alert" />
    </div>
  )
}
