import { PlusIcon } from '@fex-design/solid/icon/plus'
import { Avatar, AvatarGroup } from '@fex-design/solid/ui/avatar'
const names = ['shadcn', 'shadcn', 'shadcn', 'shadcn']
export function GroupWithIconExample() { return <AvatarGroup maxCount={3} renderOverflow={() => <span class="relative inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-muted-background text-muted-foreground ring-2 ring-background [&>svg]:size-4"><PlusIcon /></span>}>{names.map((name, index) => <Avatar key={`${name}-${index}`} src="https://github.com/shadcn.png" alt={`${name} avatar`} fallback="FX" />)}</AvatarGroup> }
