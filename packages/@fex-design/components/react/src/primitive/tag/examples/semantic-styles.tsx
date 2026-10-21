import { Tag, TagAction } from '@fex-design/react/primitive/tag'

export function TagSemanticStylesExample() {
  return (
    <Tag
      color="primary"
      className="border-dashed"
      style={{
        maxWidth: 280,
        backgroundColor: '#f3e8ff',
        borderColor: '#9333ea',
        color: '#6b21a8',
        fontSize: 16,
        fontWeight: 700,
      }}
    >
      使用结构化样式定制的标签
      <TagAction
        aria-label="Close"
        className="hover:opacity-80 rounded text-violet-700 hover:bg-violet-200"
        style={{
          marginInlineStart: 8,
          borderRadius: 999,
          backgroundColor: '#7e22ce',
          color: '#fff',
        }}
      ></TagAction>
    </Tag>
  )
}
