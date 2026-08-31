import { Separator } from '@fex-design/react/primitive/separator'
const items = [
  ['Workspace', 'Fex Design'],
  ['Plan', 'Team'],
  ['Region', 'Asia Pacific'],
]
export const ListDemo = () => (
  <div className="grid w-full max-w-lg">
    {items.map(([label, value], index) => (
      <div key={label}>
        <div className="flex justify-between py-2">
          <span>{label}</span>
          <span className="text-muted-foreground">{value}</span>
        </div>
        {index < items.length - 1 && <Separator />}
      </div>
    ))}
  </div>
)
