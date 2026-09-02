import { Tag, TagAction } from '@fex-design/solid/primitive/tag'

export default function Basic() {
  return <div class="flex flex-wrap items-center gap-2"><Tag size="sm">小型标签</Tag><Tag>默认标签</Tag><Tag size="lg">大型标签</Tag><Tag color="primary">可关闭标签<TagAction aria-label="删除可关闭标签" /></Tag><Tag color="info">可编辑标签<TagAction aria-label="编辑标签">编辑</TagAction></Tag><Tag disabled>禁用标签<TagAction disabled aria-label="删除禁用标签" /></Tag></div>
}
