import { Component, ChangeDetectionStrategy } from '@angular/core'
import { MenuRoot, MenuContent, MenuGroup, MenuGroupLabel, MenuItem } from '@fex-design/angular/primitive/menu'
@Component({ selector: 'menu-group-example', standalone: true, changeDetection: ChangeDetectionStrategy.OnPush, imports: [MenuRoot, MenuContent, MenuGroup, MenuGroupLabel, MenuItem], templateUrl: './group.html' })
export class MenuGroupExample {}
