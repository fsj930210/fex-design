import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({selector: 'dialog-fullscreen-example', standalone: true, imports: [Dialog, DialogTrigger, Button], templateUrl: './fullscreen.html'})
export class DialogFullscreenExample { mode: 'viewport' | 'screen' = 'viewport' }
