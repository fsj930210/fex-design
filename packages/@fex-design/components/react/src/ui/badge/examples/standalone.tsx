import { Badge } from '@fex-design/react/ui/badge'
export function Standalone() {
  return (
    <div className="flex items-center gap-2">
      <Badge count={11} color="warning" />
      <Badge count={25} color="danger" />
      <Badge count="◷" color="danger" />
      <Badge count={120} overflowCount={99} color="success" />
    </div>
  )
}
