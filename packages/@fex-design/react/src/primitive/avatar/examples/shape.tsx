import { Avatar, AvatarFallback } from '@fex-design/react/primitive/avatar'

export function ShapeExample() {
  return (
    <div className="flex items-center gap-3">
      <Avatar shape="circle">
        <AvatarFallback>CI</AvatarFallback>
      </Avatar>
      <Avatar shape="square">
        <AvatarFallback>SQ</AvatarFallback>
      </Avatar>
    </div>
  )
}
