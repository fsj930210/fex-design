import { ChangeDetectionStrategy, Component } from '@angular/core'
import { BreadcrumbEllipsis } from '@fex-design/angular/primitive/breadcrumb'
import {
  DropdownContent,
  DropdownRoot,
  DropdownTrigger,
} from '@fex-design/angular/primitive/dropdown'
import { PopoverPortal } from '@fex-design/angular/primitive/popover'

@Component({
  selector: 'app-breadcrumb-dropdown-demo',
  standalone: true,
  imports: [BreadcrumbEllipsis, DropdownRoot, DropdownTrigger, DropdownContent, PopoverPortal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dropdown-demo.component.html',
})
export class BreadcrumbDropdownDemoComponent {}
