import type { TagPresetColor, TagVariant } from '@fex-design/core/tag/types'
import { Tag } from '@fex-design/react/primitive/tag'

const presets: readonly TagPresetColor[] = ['primary', 'success', 'warning', 'danger', 'info']
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'] as const
const variants: readonly TagVariant[] = ['filled', 'solid', 'outlined']

export default function Colors() {
  return (
    <div className="grid gap-4">
      {variants.map((variant) => (
        <section key={variant} className="grid gap-2">
          <h4 className="text-sm font-medium">预设颜色（{variant}）</h4>
          <div className="flex flex-wrap gap-2">
            {presets.map((color) => <Tag key={color} color={color} variant={variant}>{color}</Tag>)}
          </div>
        </section>
      ))}
      {variants.map((variant) => (
        <section key={`custom-${variant}`} className="grid gap-2">
          <h4 className="text-sm font-medium">自定义颜色（{variant}）</h4>
          <div className="flex flex-wrap gap-2">
            {customColors.map((color) => <Tag key={color} color={color} variant={variant}>{color}</Tag>)}
          </div>
        </section>
      ))}
    </div>
  )
}
