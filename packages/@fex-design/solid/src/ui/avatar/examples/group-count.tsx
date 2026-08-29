import { Avatar, AvatarGroup } from '@fex-design/solid/ui/avatar'
const names = ['shadcn', 'shadcn', 'shadcn', 'shadcn', 'shadcn', 'shadcn']
export function GroupCountExample() { return <AvatarGroup maxCount={3}>{names.map((name, index) => <Avatar key={`${name}-${index}`} src="https://github.com/shadcn.png" alt={`${name} avatar`} fallback="FX" />)}</AvatarGroup> }
