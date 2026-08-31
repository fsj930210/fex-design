import {
  avatarBadgeClassName,
  avatarClassName,
  avatarFallbackClassName,
  avatarImageClassName,
  avatarImageHostClassName,
  avatarGroupClassName,
  avatarGroupOverflowClassName,
  type AvatarStyleProps,
} from '@fex-design/styles/avatar'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  effect,
  inject,
  input,
} from '@angular/core'
import { createHostClassName } from '../../signals/host-class'
import { AvatarContext } from './avatar-context'
@Component({
  selector: 'avatar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AvatarContext],
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'avatar',
    '[attr.data-size]': 'size()',
    '[attr.data-shape]': 'shape()',
  },
  template: '<ng-content />',
})
export class Avatar {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  readonly size = input<AvatarStyleProps['size']>('md')
  readonly shape = input<AvatarStyleProps['shape']>('circle')
  protected readonly hostClassName = createHostClassName(() =>
    avatarClassName({ size: this.size(), shape: this.shape() }),
  )
}

@Component({
  selector: 'avatar-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', role: 'group', 'data-slot': 'avatar-group' },
  template: '<ng-content />',
})
export class AvatarGroup {
  protected readonly hostClassName = createHostClassName(avatarGroupClassName)
}
@Component({
  selector: 'avatar-group-count',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'avatar-group-count' },
  template: '<ng-content />',
})
export class AvatarGroupCount {
  protected readonly hostClassName = createHostClassName(avatarGroupOverflowClassName)
}
@Component({
  selector: 'avatar-image',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()' },
  templateUrl: './avatar-image.html',
})
export class AvatarImage {
  readonly src = input.required<string>()
  readonly alt = input('')
  readonly srcSet = input<string | undefined>()
  readonly class = input('')
  protected readonly context = inject(AvatarContext)
  protected readonly hostClassName = createHostClassName(() => avatarImageHostClassName)
  protected readonly imageClass = computed(() => `${avatarImageClassName} ${this.class()}`)
  constructor() {
    effect(() => {
      const src = this.src()
      if (src) this.context.controller.load({ src })
      else this.context.controller.reset()
    })
  }
}
@Component({
  selector: 'avatar-fallback',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClassName()',
    'data-slot': 'avatar-fallback',
    '[hidden]': "context.status() === 'loaded'",
  },
  template: '<ng-content />',
})
export class AvatarFallback {
  protected readonly context = inject(AvatarContext)
  protected readonly hostClassName = createHostClassName(() => avatarFallbackClassName)
}
@Component({
  selector: 'avatar-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'avatar-badge' },
  template: '<ng-content />',
})
export class AvatarBadge {
  protected readonly hostClassName = createHostClassName(() => avatarBadgeClassName)
}
