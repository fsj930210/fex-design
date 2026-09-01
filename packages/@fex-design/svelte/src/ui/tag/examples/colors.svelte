<script lang="ts">
  import type { TagPresetColor, TagVariant } from '@fex-design/core/tag/types'
  import { Tag } from '@fex-design/svelte/ui/tag'
  const presets: readonly TagPresetColor[] = ['primary', 'success', 'warning', 'danger', 'info']
  const customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'] as const
  const variants: readonly TagVariant[] = ['filled', 'solid', 'outlined']
</script>
<div class="grid gap-4">{#each variants as variant (variant)}<section class="grid gap-2"><h4 class="text-sm font-medium">预设颜色（{variant}）</h4><div class="flex flex-wrap gap-2">{#each presets as color (color)}<Tag {color} {variant}>{color}</Tag>{/each}</div></section>{/each}{#each variants as variant (variant)}<section class="grid gap-2"><h4 class="text-sm font-medium">自定义颜色（{variant}）</h4><div class="flex flex-wrap gap-2">{#each customColors as color (color)}<Tag {color} {variant}>{color}</Tag>{/each}</div></section>{/each}</div>
