import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'dialog-css-variables-example',
  standalone: true,
  imports: [Dialog, DialogTrigger, Button],
  templateUrl: './css-variables.html',
})
export class DialogCssVariablesExample {}
