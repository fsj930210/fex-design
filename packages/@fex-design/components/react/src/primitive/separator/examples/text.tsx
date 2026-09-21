import { Separator } from '@fex-design/react/primitive/separator'
const Labeled = ({
  label,
  placement,
}: {
  label: string
  placement: 'start' | 'center' | 'end'
}) => (
  <div className="flex items-center gap-2">
    <Separator
      className={placement === 'start' ? 'w-12' : placement === 'end' ? 'flex-1' : 'flex-1'}
    />
    <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
    <Separator className={placement === 'end' ? 'w-12' : 'flex-1'} />
  </div>
)
export const TextDemo = () => (
  <div className="grid w-full max-w-xl gap-4">
    <Labeled label="Start" placement="start" />
    <Labeled label="Center" placement="center" />
    <Labeled label="End" placement="end" />
  </div>
)
