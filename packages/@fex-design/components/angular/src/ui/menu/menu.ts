import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  TemplateRef,
  computed,
  contentChildren,
  effect,
  forwardRef,
  inject,
  input,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { MenuRoot, SubMenu } from '@fex-design/angular/primitive/menu'
import { MENU_LEVEL } from '../../primitive/menu/context'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { menuRootClassName, menuContentClassName } from '@fex-design/components-styles/menu'
import { assertMenuContent } from '@fex-design/core/menu/items'
import { cn } from '@fex-design/utils'
import { MenuItem } from './menu-item'
import { MenuGroup } from './menu-group'
import { MenuItems } from './menu-items'
import type { MenuItemData, MenuItemTemplateContext, MenuClassNames, MenuStyles } from './types'
import { mergeStyle, type NativeStyle } from '@fex-design/angular/signals/merge-style'
@Component({
  selector: 'div[menu]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: MenuRoot, useExisting: forwardRef(() => Menu) },
    { provide: MENU_LEVEL, useValue: undefined },
  ],
  host: {
    '[style.display]': 'null',
    '[class]': 'hostClass()',
    '[style]': 'hostStyle()',
    'data-slot': 'menu-content',
    '[attr.dir]': 'dir()',
  },
  imports: [MenuItems],
  template:
    '@if (items() !== undefined) { <div menuItems [items]="items()!" [itemTemplate]="itemTemplate()" [classNames]="classNames()" [styles]="styles()"></div> } @else { <ng-content /> }',
})
export class Menu extends MenuRoot implements AfterViewInit, OnDestroy {
  readonly items = input<readonly MenuItemData[]>()
  readonly itemTemplate = input<TemplateRef<MenuItemTemplateContext>>()
  readonly className = input<string | undefined>(undefined, { alias: 'class' })
  readonly classNames = input<MenuClassNames>()
  readonly styles = input<MenuStyles>()
  readonly styleValue = input<NativeStyle | undefined>(undefined, { alias: 'style' })
  protected readonly hostStyle = computed(() => mergeStyle(this.styles()?.root, this.styleValue()))
  private readonly contentElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement
  private readonly projectedItems = contentChildren(MenuItem, { descendants: true })
  private readonly projectedSubs = contentChildren(SubMenu, { descendants: true })
  private readonly projectedGroups = contentChildren(MenuGroup, { descendants: true })
  protected readonly hostClass = createHostClassName(
    () =>
      cn(
        menuRootClassName({ size: this.size() }),
        menuContentClassName({ layout: this.layout() }),
        this.classNames()?.root,
      ),
    this.className,
  )
  private stop?: () => void
  constructor() {
    super()
    // Content queries enforce the same exclusive data/composition contract as other frameworks.
    effect(() =>
      assertMenuContent(
        this.items(),
        Boolean(
          this.projectedItems().length ||
          this.projectedSubs().length ||
          this.projectedGroups().length,
        ),
      ),
    )
  }
  ngAfterViewInit() {
    this.stop = this.binding.dom.bindContent(this.contentElement)
  }
  ngOnDestroy() {
    this.stop?.()
  }
}
