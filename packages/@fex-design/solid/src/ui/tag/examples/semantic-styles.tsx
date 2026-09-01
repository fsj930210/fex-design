import { Tag } from '@fex-design/solid/ui/tag'

export default function SemanticStyles() {
  return <Tag closable color="primary" classNames={{ root: 'border-dashed', close: 'hover:opacity-80' }} styles={{ root: { 'max-width': '280px', 'background-color': '#f3e8ff', 'border-color': '#9333ea', color: '#6b21a8', 'font-size': '16px', 'font-weight': 700 }, close: { 'margin-inline-start': '8px', 'border-radius': '999px', 'background-color': '#7e22ce', color: '#fff' } }}>使用结构化样式定制的标签</Tag>
}
