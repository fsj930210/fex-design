import { NgTemplateOutlet } from '@angular/common'
import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  Injector,
  TemplateRef,
  computed,
  effect,
  inject,
  input,
  untracked,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { getMenuBranchStore } from '@fex-design/core/menu/branch'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuRootClassName, subMenuContentClassName } from '@fex-design/components-styles/menu'
import { cn } from '@fex-design/utils'
import { MENU_LEVEL } from './context'
import { MenuRoot } from './menu-root'
import { SubMenu } from './sub-menu'
import { mergeStyle, type NativeStyle } from '@fex-design/angular/signals/merge-style'
import { subMenuBodyClassName } from '@fex-design/components-styles/menu'
@Component({
  selector: 'div[subMenuContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  providers: [{ provide: MENU_LEVEL, useFactory: () => inject(SubMenu).branch }],
  host: {
    '[class]': 'hostClass()',
    '[style]': 'hostStyle()',
    role: 'menu',
    'data-slot': 'submenu-content',
    '[attr.dir]': 'menu.binding.snapshot().dir',
    '[hidden]': "presence().phase === 'closed'",
    '[attr.inert]': 'presence().open ? null : ""',
  },
  template:
    '@if (presence().mounted) { <div data-slot="popover-body" [class]="bodyClass()" [style]="popup()?.styles?.content"><ng-container [ngTemplateOutlet]="content()" [ngTemplateOutletInjector]="contentInjector" [ngTemplateOutletContext]="{ injector: contentInjector }" /></div> }',
})
export class SubMenuContent implements AfterViewInit, OnDestroy {
  readonly content = input.required<TemplateRef<unknown>>()
  readonly container = input<HTMLElement | null>()
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly styleValue = input<NativeStyle | undefined>(undefined, { alias: 'style' })
  protected readonly menu = inject(MenuRoot)
  protected readonly sub = inject(SubMenu)
  protected readonly contentInjector = inject(Injector)
  protected readonly presence = createCoreStoreSignal(getMenuBranchStore(this.sub.branch))
  protected readonly popup = computed(() =>
    this.menu.binding.snapshot().layout === 'inline' ? undefined : this.sub.popoverProps(),
  )
  protected readonly hostStyle = computed(() =>
    mergeStyle(this.popup()?.styles?.root, this.styleValue()),
  )
  protected readonly bodyClass = computed(() =>
    cn(subMenuBodyClassName, this.popup()?.classNames?.content),
  )
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  protected readonly hostClass = createHostClassName(() => {
    const state = this.menu.binding.snapshot()
    return cn(
      state.layout !== 'inline' && menuRootClassName({ size: state.size }),
      subMenuContentClassName({ inline: state.layout === 'inline' }),
      this.popup()?.classNames?.root,
    )
  }, this.className)
  private stop?: () => void
  constructor() {
    // Portal container changes synchronize the DOM adapter.
    effect(() => {
      this.container()
      this.sub.value()
      untracked(() => this.menu.binding.dom.refresh())
    })
  }
  ngAfterViewInit() {
    this.stop = this.menu.binding.dom.bindContent(this.element, this.sub.branch, () => ({
      container: this.container(),
    }))
  }
  ngOnDestroy() {
    this.stop?.()
  }
}
