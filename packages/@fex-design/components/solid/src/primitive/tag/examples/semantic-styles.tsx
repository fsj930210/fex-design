import { Tag, TagAction } from '@fex-design/solid/primitive/tag'

export function TagSemanticStylesExample() {
  return (
    <Tag
      color="primary"
      class="border-dashed"
      style={{
        'max-width': 280,
        'background-color': '#f3e8ff',
        'border-color': '#9333ea',
        color: '#6b21a8',
        'font-size': 16,
        'font-weight': 700,
      }}
    >
      使用结构化样式定制的标签
      <TagAction
        aria-label="Close"
        class="hover:opacity-80 rounded text-violet-700 hover:bg-violet-200"
        style={{
          'margin-inline-start': 8,
          'border-radius': 999,
          'background-color': '#7e22ce',
          color: '#fff',
        }}
      ></TagAction>
    </Tag>
  )
}
