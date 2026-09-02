import {
  isTagPresetColor,
  type TagClassNames,
  type TagOptions,
  type TagPresetColor,
  type TagStyles,
} from '@fex-design/core/tag/types'
import { tagClassName, tagActionClassName } from '@fex-design/styles/tag'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  input,
  output,
} from '@angular/core'
import { TagAction } from '../../primitive/tag/tag'
import { createHostClassName } from '../../signals/host-class'

@Directive({ selector: '[tagCloseIcon]', standalone: true })
export class TagCloseIcon {}

@Component({
  selector: 'span[tag]',
  standalone: true,
  imports: [TagAction],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[style]': 'styles().root',
    '[style.--tag-color]': 'customColor()',
    '[attr.data-color]': 'dataColor()',
    '[attr.data-variant]': 'variant()',
    '[attr.data-size]': 'size()',
    '[attr.data-disabled]': "disabled() ? 'true' : null",
    'data-slot': 'tag',
  },
  templateUrl: './tag.html',
})
export class Tag {
  readonly color = input<TagOptions['color']>()
  readonly variant = input<NonNullable<TagOptions['variant']>>('filled')
  readonly size = input<NonNullable<TagOptions['size']>>('md')
  readonly disabled = input(false, { transform: booleanAttribute })
  readonly closable = input(false, { transform: booleanAttribute })
  readonly classNames = input<TagClassNames>({})
  readonly styles = input<TagStyles<string>>({})
  readonly close = output<MouseEvent>()
  protected readonly projectedCloseIcon = contentChild(TagCloseIcon)
  protected readonly presetColor = computed<TagPresetColor | undefined>(() => {
    const color = this.color()
    return isTagPresetColor(color) ? color : undefined
  })
  protected readonly dataColor = computed(() =>
    this.presetColor() ?? (this.color() ? 'custom' : null),
  )
  protected readonly customColor = computed(() =>
    this.color() && !this.presetColor() ? this.color() : null,
  )
  protected readonly hostClassName = createHostClassName(() =>
    `${tagClassName({
      variant: this.variant(),
      color: this.presetColor(),
      size: this.size(),
    })} ${this.classNames().root ?? ''}`,
  )
  protected readonly closeClassName = computed(
    () => `${tagActionClassName} ${this.classNames().close ?? ''}`,
  )
}
