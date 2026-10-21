import { Avatar } from '@fex-design/react/ui/avatar'

export function ShapeExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar shape="circle" fallback="CI" />
      <Avatar shape="square" fallback="SQ" />
    </div>
  )
}
