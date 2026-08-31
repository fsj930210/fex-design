import {
  badgeClassName,
  badgeDotClassName,
  badgeDotColorClassName,
  badgeRibbonRootClassName,
  badgeRootClassName,
} from '@fex-design/styles/badge'
import {
  getBadgeOffsetTransform,
  isBadgePresetColor,
  type BadgeAttachmentOptions,
  type BadgeClassNames,
  type BadgeOptions,
  type BadgePresetColor,
  type BadgeStyles,
} from '@fex-design/core'
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  forwardRef,
  inject,
  input,
} from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
import { BadgeRibbon as PrimitiveBadgeRibbon } from '../../primitive/badge/badge'
import { BADGE_ITEM } from '../../primitive/badge/badge-item'
export { BadgeGroup } from '../../primitive/badge/badge'

@Component({
  selector: 'span[badge]',
  standalone: true,
  providers: [{ provide: BADGE_ITEM, useExisting: forwardRef(() => Badge) }],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    '[attr.data-slot]': 'attached() ? "badge-root" : "badge"',
    '[style]': 'styles().root',
    '[style.--badge-color]': 'customColor()',
  },
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class Badge {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  readonly count = input<BadgeOptions['count']>()
  readonly dot = input(false, { transform: booleanAttribute })
  readonly color = input<BadgeOptions['color']>()
  readonly showZero = input<NonNullable<BadgeOptions['showZero']>>(false)
  readonly overflowCount = input<BadgeOptions['overflowCount']>()
  readonly offset = input<BadgeAttachmentOptions['offset']>()
  readonly classNames = input<BadgeClassNames>({})
  readonly styles = input<BadgeStyles<string>>({})
  protected readonly presetColor = computed<BadgePresetColor | undefined>(() => {
    const color = this.color()
    return isBadgePresetColor(color) ? color : undefined
  })
  protected readonly customColor = computed(() =>
    this.color() && !this.presetColor() ? this.color() : undefined,
  )
  protected readonly attached = computed(() => this.dot() || this.count() !== undefined)
  protected readonly hostClassName = createHostClassName(
    () =>
      `${
        this.attached() ? badgeRootClassName : badgeClassName({ color: this.presetColor() })
      } ${this.classNames().root ?? ''}`,
  )
  protected readonly value = computed(() => {
    const count = this.count()
    const limit = this.overflowCount()
    return typeof count === 'number' && limit !== undefined && count > limit ? `${limit}+` : count
  })
  protected readonly visible = computed(
    () => this.dot() || (this.value() !== undefined && (this.value() !== 0 || this.showZero())),
  )
  protected readonly indicatorClassName = computed(() =>
    this.dot()
      ? `${badgeDotClassName} ${badgeDotColorClassName({ color: this.presetColor() })} ${this.classNames().indicator ?? ''}`
      : `${badgeClassName({ color: this.presetColor() })} ${this.classNames().indicator ?? ''}`,
  )
  protected readonly offsetTransform = computed(() => getBadgeOffsetTransform(this.offset()))
}

@Component({
  selector: 'div[badgeRibbon]',
  standalone: true,
  imports: [PrimitiveBadgeRibbon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'badge-ribbon-root' },
  templateUrl: './badge-ribbon.html',
})
export class BadgeRibbon {
  readonly text = input('')
  readonly color = input<NonNullable<BadgeOptions['color']>>('primary')
  readonly placement = input<'start' | 'end'>('end')
  protected readonly hostClassName = createHostClassName(badgeRibbonRootClassName)
}
