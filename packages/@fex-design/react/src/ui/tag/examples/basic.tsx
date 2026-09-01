import { Tag } from '@fex-design/react/ui/tag'

export default function Basic() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Tag size="sm">小型标签</Tag>
      <Tag>默认标签</Tag>
      <Tag size="lg">大型标签</Tag>
      <Tag closable color="primary">可关闭标签</Tag>
      <Tag closable disabled>禁用标签</Tag>
    </div>
  )
}
