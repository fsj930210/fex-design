import { Tag } from '@fex-design/react/ui/tag'

export default function SemanticStyles() {
  return (
    <Tag
      closable
      color="primary"
      classNames={{ root: 'border-dashed', close: 'hover:opacity-80' }}
      styles={{
        root: { maxWidth: 280, backgroundColor: '#f3e8ff', borderColor: '#9333ea', color: '#6b21a8', fontSize: 16, fontWeight: 700 },
        close: { marginInlineStart: 8, borderRadius: 999, backgroundColor: '#7e22ce', color: '#fff' },
      }}
    >
      使用结构化样式定制的标签
    </Tag>
  )
}
