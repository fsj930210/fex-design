import { NgTemplateOutlet } from '@angular/common'
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  TemplateRef,
  contentChildren,
  computed,
  effect,
  inject,
  input,
} from '@angular/core'
import { splitOverflowItems } from '@fex-design/core/collection/split-overflow-items'
import type {
  AvatarClassNames,
  AvatarGroupClassNames,
  AvatarGroupStyles,
  AvatarStyles,
} from '@fex-design/core/avatar/types'
import {
  Avatar as PrimitiveAvatar,
  AvatarFallback,
  AvatarGroup as PrimitiveAvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from '../../primitive/avatar/avatar'
import type { AvatarStyleProps } from '@fex-design/styles/avatar'

@Component({
  selector: 'span[avatar]',
  standalone: true,
  imports: [PrimitiveAvatar, AvatarImage, AvatarFallback],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.html',
})
export class Avatar {
  readonly element = inject<ElementRef<HTMLElement>>(ElementRef)
  readonly src = input<string | undefined>()
  readonly alt = input('')
  readonly srcSet = input<string | undefined>()
  readonly fallback = input<string | undefined>()
  readonly size = input<AvatarStyleProps['size']>('md')
  readonly shape = input<AvatarStyleProps['shape']>('circle')
  readonly classNames = input<AvatarClassNames>({})
  readonly styles = input<AvatarStyles<string>>({})
}

@Component({
  selector: 'div[avatarGroup]',
  standalone: true,
  imports: [PrimitiveAvatarGroup, AvatarGroupCount, NgTemplateOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar-group.html',
})
export class AvatarGroup {
  readonly maxCount = input<number | undefined>()
  readonly overflow = input<
    TemplateRef<{ $implicit: number; items: readonly Avatar[] }> | undefined
  >()
  readonly classNames = input<AvatarGroupClassNames>({})
  readonly styles = input<AvatarGroupStyles<string>>({})
  readonly avatars = contentChildren(Avatar)
  protected readonly split = computed(() => splitOverflowItems(this.avatars(), this.maxCount()))
  constructor() {
    effect(() => {
      const visible = new Set(this.split().visibleItems)
      for (const avatar of this.avatars())
        avatar.element.nativeElement.hidden = !visible.has(avatar)
    })
  }
}
