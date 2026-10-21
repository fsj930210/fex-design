import { isTagPresetColor, type TagOptions, type TagPresetColor } from '@fex-design/core/tag/types'
import { tagClassName } from '@fex-design/components-styles/tag'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'

export { TagAction } from './tag-action'

@Component({
  selector: 'span[tag]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[style.--tag-color]': 'customColor()',
    '[attr.data-color]': 'dataColor()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-disabled]': "disabled() ? 'true' : null",
    'data-slot': 'tag',
  },
  template: '<ng-content />',
})
export class Tag {
  readonly class = input<string>()
  readonly color = input<TagOptions['color']>()
  readonly variant = input<NonNullable<TagOptions['variant']>>('filled')
  readonly size = input<NonNullable<TagOptions['size']>>('md')
  readonly disabled = input(false, { transform: booleanAttribute })
  protected readonly presetColor = computed<TagPresetColor | undefined>(() => {
    const color = this.color()
    return isTagPresetColor(color) ? color : undefined
  })
  protected readonly dataColor = computed(
    () => this.presetColor() ?? (this.color() ? 'custom' : null),
  )
  protected readonly customColor = computed(() =>
    this.color() && !this.presetColor() ? this.color() : null,
  )
  protected readonly hostClassName = createHostClassName(
    () =>
      tagClassName({
        variant: this.variant(),
        color: this.presetColor(),
        size: this.size(),
      }),
    () => this.class(),
  )
}
