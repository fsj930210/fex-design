import { Alert, AlertIcon, AlertTitle } from '@fex-design/react/primitive/alert'
import { InfoIcon } from '../../../icon/info'

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
          <AlertIcon><InfoIcon /></AlertIcon>
          <AlertTitle>{title}</AlertTitle>
        </Alert>
      ))}
    </div>
  )
}
