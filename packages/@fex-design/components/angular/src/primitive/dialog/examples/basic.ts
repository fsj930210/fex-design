import { Component } from '@angular/core'
import { DialogRoot,  DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/primitive/button'
@Component({selector:'dialog-basic-primitive-example',standalone:true,imports:[DialogRoot,DialogPortal,DialogOverlay,DialogContent,DialogHeader,DialogTitle,DialogBody,DialogFooter,DialogClose,Button],templateUrl:'./basic.html'})
export class DialogBasicExample { open=false }



