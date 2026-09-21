import { ElementRef, InjectionToken } from '@angular/core'

export interface BadgeItem {
  readonly element: ElementRef<HTMLElement>
}

export const BADGE_ITEM = new InjectionToken<BadgeItem>('BadgeItem')
