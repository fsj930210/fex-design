import {
  isTagPresetColor,
  type TagOptions,
  type TagPresetColor,
} from '@fex-design/core/tag/types'
import { tagClassName, tagActionClassName } from '@fex-design/styles/tag'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core'
import { NgComponentOutlet } from '@angular/common'
import { CloseIcon } from '../../icon/close'
import { createHostClassName } from '../../signals/host-class'

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
  readonly color = input<TagOptions['color']>()
  readonly variant = input<NonNullable<TagOptions['variant']>>('filled')
  readonly size = input<NonNullable<TagOptions['size']>>('md')
  readonly disabled = input(false, { transform: booleanAttribute })
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
    tagClassName({
      variant: this.variant(),
      color: this.presetColor(),
      size: this.size(),
    }),
  )
}

@Component({
  selector: 'button[tagAction]',
  standalone: true,
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.aria-label]': 'ariaLabel()',
    'data-slot': 'tag-action',
    type: 'button',
  },
  templateUrl: './tag-action.html',
})
export class TagAction {
  readonly ariaLabel = input<string | undefined>(undefined, { alias: 'aria-label' })
  protected readonly defaultIcon = CloseIcon
  protected readonly hostClassName = createHostClassName(tagActionClassName)
}
