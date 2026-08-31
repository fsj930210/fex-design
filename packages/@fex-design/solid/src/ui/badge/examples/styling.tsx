import { Badge } from '@fex-design/solid/ui/badge'
export function Styling() {
  return (
    <Badge
      count={8}
      classNames={{
        root: 'rounded-xl bg-violet-50 p-3',
        content: 'rounded-lg bg-violet-100 text-violet-950',
        indicator: 'font-bold',
      }}
      styles={{
        root: { outline: '2px dashed #7c3aed' },
        content: { padding: '16px 20px' },
        indicator: { background: '#7c3aed' },
      }}
    >
      结构化样式
    </Badge>
  )
}
