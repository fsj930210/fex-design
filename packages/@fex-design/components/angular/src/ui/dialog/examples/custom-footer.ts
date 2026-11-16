import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { DialogFooter } from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({selector: 'dialog-custom-footer-example', standalone: true, imports: [Dialog, DialogTrigger, DialogFooter, Button], templateUrl: './custom-footer.html'})
export class DialogCustomFooterExample {}
