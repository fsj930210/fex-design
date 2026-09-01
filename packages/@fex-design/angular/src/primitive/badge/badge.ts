import {
  isBadgePresetColor,
  type BadgeDotOptions,
  type BadgeGroupOptions,
  type BadgeOptions,
  type BadgePresetColor,
  type BadgeRibbonOptions,
} from '@fex-design/core'
import { splitOverflowItems } from '@fex-design/core/collection/split-overflow-items'
import {
  badgeClassName,
  badgeDotClassName,
  badgeDotColorClassName,
  badgeGroupClassName,
  badgeRibbonClassName,
  badgeRibbonColorClassName,
  badgeRibbonTextClassName,
} from '@fex-design/styles/badge'
import { CommonModule, NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
import { BADGE_ITEM, type BadgeItem } from './badge-item'

@Component({
  selector: 'badge',
  standalone: true,
  providers: [{ provide: BADGE_ITEM, useExisting: forwardRef(() => Badge) }],
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'badge',
    '[attr.data-color]': 'color() ?? "default"',
    '[attr.data-size]': 'size()',
    '[style.--badge-color]': 'customColor()',
  },
  templateUrl: './badge.html',
})
export class Badge {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  readonly color = input<BadgeOptions['color']>()
  readonly size = input<NonNullable<BadgeOptions['size']>>('md')
  readonly count = input<BadgeOptions['count']>()
  readonly showZero = input<NonNullable<BadgeOptions['showZero']>>(false)
  readonly overflowCount = input<BadgeOptions['overflowCount']>()
  protected readonly presetColor = computed<BadgePresetColor | undefined>(() => {
    const color = this.color()
    return isBadgePresetColor(color) ? color : undefined
  })
  protected readonly customColor = computed(() =>
    this.color() && !this.presetColor() ? this.color() : undefined,
  )
  protected readonly hostClassName = createHostClassName(() =>
    badgeClassName({ color: this.presetColor(), size: this.size() }),
  )
}

@Component({
  selector: 'badge-group',
  standalone: true,
  imports: [NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'badge-group' },
  templateUrl: './badge-group.html',
})
export class BadgeGroup {
  readonly maxCount = input<BadgeGroupOptions['maxCount']>()
  readonly overflow = input<
    TemplateRef<{ $implicit: number; items: readonly BadgeItem[] }> | undefined
  >()
  private readonly badges = contentChildren(BADGE_ITEM)
  protected readonly hostClassName = createHostClassName(badgeGroupClassName)
  protected readonly overflowCount = computed(
    () => splitOverflowItems(this.badges(), this.maxCount()).overflowCount,
  )
  protected readonly overflowItems = computed(
    () => splitOverflowItems(this.badges(), this.maxCount()).overflowItems,
  )
  protected readonly overflowClassName = badgeClassName({ color: 'default' })

  constructor() {
    effect(() => {
      const split = splitOverflowItems(this.badges(), this.maxCount())
      const visible = new Set(split.visibleItems)
      for (const badge of this.badges()) badge.element.nativeElement.hidden = !visible.has(badge)
    })
  }
}

@Component({
  selector: 'span[badgeDot]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'badge-dot',
    '[attr.data-color]': 'color() ?? "default"',
    '[attr.data-size]': 'size()',
    '[style.--badge-color]': 'customColor()',
  },
  template: '',
})
export class BadgeDot {
  readonly color = input<BadgeDotOptions['color']>()
  readonly size = input<NonNullable<BadgeDotOptions['size']>>('md')
  protected readonly presetColor = computed<BadgePresetColor | undefined>(() => {
    const color = this.color()
    return isBadgePresetColor(color) ? color : undefined
  })
  protected readonly customColor = computed(() =>
    this.color() && !this.presetColor() ? this.color() : undefined,
  )
  protected readonly hostClassName = createHostClassName(
    () =>
      `${badgeDotClassName({ size: this.size() })} ${badgeDotColorClassName({ color: this.presetColor() })}`,
  )
}

@Component({
  selector: 'span[badgeRibbon]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'badge-ribbon',
    '[attr.data-color]': 'color()',
    '[attr.data-placement]': 'placement()',
    '[style.--badge-color]': 'customColor()',
  },
  templateUrl: './badge-ribbon.html',
})
export class BadgeRibbon {
  readonly color = input<NonNullable<BadgeRibbonOptions['color']>>('primary')
  readonly placement = input<NonNullable<BadgeRibbonOptions['placement']>>('end')
  protected readonly presetColor = computed<BadgePresetColor | undefined>(() => {
    const color = this.color()
    return isBadgePresetColor(color) ? color : undefined
  })
  protected readonly customColor = computed(() =>
    this.color() && !this.presetColor() ? this.color() : undefined,
  )
  protected readonly hostClassName = createHostClassName(
    () =>
      `${badgeRibbonClassName} ${badgeRibbonColorClassName({ color: this.presetColor() ?? 'primary' })}`,
  )
  protected readonly textClassName = badgeRibbonTextClassName
}
