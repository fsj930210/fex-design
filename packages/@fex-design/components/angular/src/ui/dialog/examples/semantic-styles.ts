import { Component } from '@angular/core'
import { Dialog, DialogTrigger } from '@fex-design/angular/ui/dialog'
import { Button } from '@fex-design/angular/ui/button'
@Component({
  selector: 'dialog-semantic-styles-example',
  standalone: true,
  imports: [Dialog, DialogTrigger, Button],
  templateUrl: './semantic-styles.html',
})
export class DialogSemanticStylesExample {}
