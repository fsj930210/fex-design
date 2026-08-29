import { PlusIcon } from '@fex-design/react/icon/plus'
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@fex-design/react/primitive/avatar'

export function BadgeWithIconExample() { return <Avatar><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback>FX</AvatarFallback><AvatarBadge className="rounded-sm bg-foreground text-background" aria-label="Add"><PlusIcon /></AvatarBadge></Avatar> }
