import { Tag } from '@fex-design/react/primitive/tag'

export default function Variants() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag color="primary" variant="filled">Filled</Tag>
      <Tag color="primary" variant="solid">Solid</Tag>
      <Tag color="primary" variant="outlined">Outlined</Tag>
    </div>
  )
}
