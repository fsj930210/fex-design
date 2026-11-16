import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({selector: 'dialog-overlay-example', standalone: true, imports: [Dialog, DialogTrigger, Button], templateUrl: './overlay.html'})
export class DialogOverlayExample {}
