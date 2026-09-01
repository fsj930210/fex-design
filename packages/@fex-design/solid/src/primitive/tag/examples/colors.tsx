import type { TagPresetColor, TagVariant } from '@fex-design/core/tag/types'
import { Tag } from '@fex-design/solid/primitive/tag'
import { For } from 'solid-js'

const presets: readonly TagPresetColor[] = ['primary', 'success', 'warning', 'danger', 'info']
const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'] as const
const variants: readonly TagVariant[] = ['filled', 'solid', 'outlined']

export default function Colors() {
  return <div class="grid gap-4"><For each={variants}>{(variant) => <section class="grid gap-2"><h4 class="text-sm font-medium">预设颜色（{variant}）</h4><div class="flex flex-wrap gap-2"><For each={presets}>{(color) => <Tag color={color} variant={variant}>{color}</Tag>}</For></div></section>}</For><For each={variants}>{(variant) => <section class="grid gap-2"><h4 class="text-sm font-medium">自定义颜色（{variant}）</h4><div class="flex flex-wrap gap-2"><For each={customColors}>{(color) => <Tag color={color} variant={variant}>{color}</Tag>}</For></div></section>}</For></div>
}
