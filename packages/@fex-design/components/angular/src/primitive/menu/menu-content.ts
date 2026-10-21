import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  inject,
  input,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuRootClassName, menuContentClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
import { MenuRoot } from './menu-root'
@Component({
  selector: 'div[menuContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClass()',
    '[attr.dir]': 'menu.binding.snapshot().dir',
    'data-slot': 'menu-content',
  },
  template: '<ng-content />',
})
export class MenuContent implements AfterViewInit, OnDestroy {
  protected readonly menu = inject(MenuRoot)
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  protected readonly hostClass = createHostClassName(() => {
    const state = this.menu.binding.snapshot()
    return cn(
      menuRootClassName({ size: state.size }),
      menuContentClassName({ layout: state.layout }),
    )
  }, this.className)
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  private stop?: () => void
  ngAfterViewInit() {
    this.stop = this.menu.binding.dom.bindContent(this.element)
  }
  ngOnDestroy() {
    this.stop?.()
  }
}
