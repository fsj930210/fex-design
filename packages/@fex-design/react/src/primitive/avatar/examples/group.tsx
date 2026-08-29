import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from '@fex-design/react/primitive/avatar'

export function GroupExample() { return <AvatarGroup><Avatar><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback>FX</AvatarFallback></Avatar><Avatar><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback>FX</AvatarFallback></Avatar><Avatar><AvatarImage src="https://github.com/shadcn.png" alt="shadcn avatar" /><AvatarFallback>FX</AvatarFallback></Avatar></AvatarGroup> }
