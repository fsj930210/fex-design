import { Alert, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
import { CircleInfoIcon } from '@fex-design/react/icon/circle-info'

const variants = [
  ['filled', 'Filled Alert'],
  ['outlined', 'Outlined Alert'],
  ['solid', 'Solid Alert'],
] as const

export default function Variants() {
  return (
    <div className="grid w-full gap-3">
      {variants.map(([variant, title]) => (
        <Alert key={variant} variant={variant}>
          <AlertIcon><CircleInfoIcon /></AlertIcon>
          <AlertTitle>{title}</AlertTitle>
        </Alert>
      ))}
    </div>
  )
}
