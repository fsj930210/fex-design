import {
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  viewChild,
  type AfterViewInit,
  type OnDestroy,
} from '@angular/core'
import { useMenu, type MenuBranch } from '@fex-design/angular/ui/menu'
import { menuCustomItemClass, menuCustomActionClass } from '@fex-design/docs-shared/menu-demo'
@Component({
  selector: 'menu-use-menu-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './use-menu.html',
})
export class MenuUseMenuExample implements AfterViewInit, OnDestroy {
  readonly binding = useMenu({
    layout: 'inline',
    defaultValue: ['overview'],
    defaultOpenValues: ['workspace'],
  })
  readonly itemClass = menuCustomItemClass
  readonly actionClass = menuCustomActionClass
  private readonly branch: MenuBranch = { value: () => 'workspace', parent: undefined }
  readonly content = viewChild.required<ElementRef<HTMLElement>>('content')
  readonly overview = viewChild.required<ElementRef<HTMLElement>>('overview')
  readonly workspace = viewChild.required<ElementRef<HTMLElement>>('workspace')
  readonly nested = viewChild.required<ElementRef<HTMLElement>>('nested')
  readonly members = viewChild.required<ElementRef<HTMLElement>>('members')
  readonly roles = viewChild.required<ElementRef<HTMLElement>>('roles')
  readonly billing = viewChild.required<ElementRef<HTMLElement>>('billing')
  readonly profile = viewChild.required<ElementRef<HTMLElement>>('profile')
  private stops: (() => void)[] = []
  ngAfterViewInit() {
    const { dom } = this.binding,
      branch = this.branch
    this.stops = [
      dom.bindContent(this.content().nativeElement),
      dom.bindItem(this.overview().nativeElement, () => ({ value: 'overview' })),
      dom.bindItem(
        this.workspace().nativeElement,
        () => ({ value: 'workspace' }),
        undefined,
        branch,
      ),
      dom.bindContent(this.nested().nativeElement, branch),
      dom.bindItem(this.members().nativeElement, () => ({ value: 'members' }), branch),
      dom.bindItem(this.roles().nativeElement, () => ({ value: 'roles' }), branch),
      dom.bindItem(
        this.billing().nativeElement,
        () => ({ value: 'billing', disabled: true }),
        branch,
      ),
      dom.bindItem(this.profile().nativeElement, () => ({ value: 'profile' })),
    ]
  }
  selectRoles() {
    this.binding.controller.setValue(['roles'])
    this.binding.controller.setOpen('workspace', true)
  }
  clear() {
    this.binding.controller.setValue([])
    this.binding.controller.closeAll()
  }
  ngOnDestroy() {
    this.stops.forEach((stop) => stop())
  }
}
