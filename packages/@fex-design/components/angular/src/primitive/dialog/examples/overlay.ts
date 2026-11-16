import { Component } from '@angular/core'
import { DialogRoot,  DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/primitive/button'
@Component({selector:'dialog-overlay-primitive-example',standalone:true,imports:[DialogRoot,DialogPortal,DialogOverlay,DialogContent,DialogHeader,DialogTitle,DialogBody,DialogFooter,DialogClose,Button],templateUrl:'./overlay.html'})
export class DialogOverlayExample { open=false }



