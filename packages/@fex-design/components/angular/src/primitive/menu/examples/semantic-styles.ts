import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core'
import {
  MenuRoot,
  MenuContent,
  MenuItem,
  SubMenu,
  SubMenuTrigger,
  SubMenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
} from '@fex-design/angular/primitive/menu'
import { Button } from '@fex-design/angular/ui/button'
import type { MenuPopoverProps } from '@fex-design/angular/primitive/menu'
import type { MenuClassNames, MenuStyles } from '@fex-design/angular/primitive/menu'
@Component({
  selector: 'menu-semantic-styles-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MenuRoot,
    MenuContent,
    MenuItem,
    SubMenu,
    SubMenuTrigger,
    SubMenuContent,
    MenuGroup,
    MenuGroupLabel,
    MenuSeparator,
    Button,
  ],
  templateUrl: './semantic-styles.html',
})
export class MenuSemanticStylesExample {
  readonly styled = signal(true)
  readonly open = signal(['workspace'])
  readonly names = computed<MenuClassNames>(() =>
    this.styled()
      ? {
          root: 'rounded-xl border-2 border-violet-300 bg-violet-50 p-2',
          item: 'rounded-lg hover:bg-violet-100 data-[selected=true]:bg-violet-200 data-[selected=true]:text-violet-950',
          subMenuTrigger: 'rounded-lg bg-violet-100 text-violet-950 hover:bg-violet-200',
          subMenuContent: 'min-w-48',
          group: 'rounded-lg bg-violet-100/50',
          separator: 'bg-violet-300',
        }
      : { root: 'rounded-xl border border-border bg-background p-2', subMenuContent: 'min-w-48' },
  )
  readonly partStyles = computed<MenuStyles | undefined>(() =>
    this.styled()
      ? {
          root: { borderRadius: '16px' },
          item: { fontWeight: 500 },
          subMenuTrigger: { fontWeight: 600 },
        }
      : undefined,
  )
  readonly popup = computed<MenuPopoverProps | undefined>(() =>
    this.styled()
      ? {
          classNames: {
            root: 'border-2 border-violet-300 bg-violet-50',
            content: 'rounded-lg bg-violet-100/50 p-2',
          },
          styles: { root: { borderRadius: '16px' }, content: { gap: '8px' } },
        }
      : undefined,
  )
  show(next: boolean) {
    this.styled.set(next)
    this.open.set(['workspace'])
  }
}
