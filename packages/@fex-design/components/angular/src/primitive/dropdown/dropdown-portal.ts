import { Directive } from '@angular/core'
import { PopoverPortal } from '../popover'

@Directive({ selector: 'ng-template[dropdownPortal]', standalone: true })
export class DropdownPortal extends PopoverPortal {}
