import { Tag } from '@fex-design/solid/ui/tag'
import type { JSX } from 'solid-js'

const style = {
  '--tag-color-primary': '#7c3aed',
  '--tag-color-primary-foreground': '#fff',
  '--tag-color-danger': '#e11d48',
  '--tag-color-danger-foreground': '#fff',
} as JSX.CSSProperties

export default function CssVariables() {
  return (
    <div class="flex flex-wrap gap-2" style={style}>
      <Tag closable color="primary" variant="filled">
        覆盖后的 Primary
      </Tag>
      <Tag closable color="primary" variant="solid">
        覆盖后的 Primary
      </Tag>
      <Tag closable color="danger" variant="outlined">
        覆盖后的 Danger
      </Tag>
    </div>
  )
}
