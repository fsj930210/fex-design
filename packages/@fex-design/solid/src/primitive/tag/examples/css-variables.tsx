import { Tag } from '@fex-design/solid/primitive/tag'
import type { JSX } from 'solid-js'

const style = { '--tag-color-primary': '#7c3aed', '--tag-color-primary-foreground': '#fff', '--tag-color-danger': '#e11d48', '--tag-color-danger-foreground': '#fff' } as JSX.CSSProperties

export default function CssVariables() {
  return <div class="flex flex-wrap gap-2" style={style}><Tag color="primary" variant="filled">覆盖后的 Primary</Tag><Tag color="primary" variant="solid">覆盖后的 Primary</Tag><Tag color="danger" variant="outlined">覆盖后的 Danger</Tag></div>
}
