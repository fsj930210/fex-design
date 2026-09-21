import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from '@fex-design/solid/primitive/avatar'
export function BadgeExample() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" />
      <AvatarFallback>FX</AvatarFallback>
      <AvatarBadge aria-label="Online" />
    </Avatar>
  )
}
