import type { TagPresetColor, TagVariant } from '@fex-design/core/tag/types'
import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Tag } from '@fex-design/angular/ui/tag'
@Component({ selector: 'tag-ui-colors-example', standalone: true, imports: [Tag], changeDetection: ChangeDetectionStrategy.OnPush, templateUrl: './colors.html' })
export class Colors { protected readonly presets: readonly TagPresetColor[] = ['primary', 'success', 'warning', 'danger', 'info']; protected readonly customColors = ['#f50', '#2db7f5', '#87d068', '#108ee9'] as const; protected readonly variants: readonly TagVariant[] = ['filled', 'solid', 'outlined'] }
