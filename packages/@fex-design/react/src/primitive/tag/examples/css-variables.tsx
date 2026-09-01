import { Tag } from '@fex-design/react/primitive/tag'
import type { CSSProperties } from 'react'

const style = {
  '--tag-color-primary': '#7c3aed',
  '--tag-color-primary-foreground': '#fff',
  '--tag-color-danger': '#e11d48',
  '--tag-color-danger-foreground': '#fff',
} as CSSProperties

export default function CssVariables() {
  return (
    <div className="flex flex-wrap gap-2" style={style}>
      <Tag color="primary" variant="filled">覆盖后的 Primary</Tag>
      <Tag color="primary" variant="solid">覆盖后的 Primary</Tag>
      <Tag color="danger" variant="outlined">覆盖后的 Danger</Tag>
    </div>
  )
}
