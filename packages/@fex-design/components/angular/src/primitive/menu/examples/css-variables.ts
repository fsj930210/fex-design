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
@Component({
  selector: 'menu-css-variables-example',
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
  templateUrl: './css-variables.html',
})
export class MenuCssVariablesExample {
  readonly styled = signal(true)
  readonly open = signal(['workspace'])
  readonly theme = computed(() =>
    this.styled()
      ? {
          '--menu-background': '#faf5ff',
          '--menu-color': '#3b0764',
          '--menu-item-background': '#ffffff',
          '--menu-item-color': '#5b21b6',
          '--menu-item-hover-background': '#ede9fe',
          '--menu-item-hover-color': '#4c1d95',
          '--menu-item-selected-background': '#ddd6fe',
          '--menu-item-selected-color': '#4c1d95',
          '--menu-item-disabled-color': '#a78bfa',
          '--menu-item-height': '40px',
          '--menu-item-radius': '10px',
          '--menu-indent': '24px',
        }
      : undefined,
  )
  show(next: boolean) {
    this.styled.set(next)
    this.open.set(['workspace'])
  }
}
