import { Component } from '@angular/core'
import { DialogRoot,  DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/primitive/button'
@Component({selector:'dialog-position-primitive-example',standalone:true,imports:[DialogRoot,DialogPortal,DialogOverlay,DialogContent,DialogHeader,DialogTitle,DialogBody,DialogFooter,DialogClose,Button],templateUrl:'./position.html'})
export class DialogPositionExample { open=false }



