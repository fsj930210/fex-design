import { Avatar } from '@fex-design/react/ui/avatar'

const sizes = ['sm', 'md', 'lg'] as const

export function SizesExample() {
  return <div className="flex items-center gap-3">{sizes.map((size) => <Avatar key={size} size={size} src="/avatar-demo.svg" alt={size} fallback={size} />)}</div>
}
