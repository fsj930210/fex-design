import { Component } from '@angular/core'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogClose } from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/primitive/button'
@Component({selector:'dialog-advanced-primitive-example',standalone:true,imports:[DialogRoot,DialogPortal,DialogOverlay,DialogContent,DialogHeader,DialogTitle,DialogBody,DialogClose,Button],templateUrl:'./advanced.html'})
export class DialogAdvancedExample { open=false; minimized=false; maximized=false; position={x:0,y:0}; private start={x:0,y:0}; private moving=false; dragStart(e:PointerEvent){this.moving=true;this.start={x:e.clientX-this.position.x,y:e.clientY-this.position.y}} dragMove(e:PointerEvent){if(this.moving)this.position={x:e.clientX-this.start.x,y:e.clientY-this.start.y}} dragEnd(){this.moving=false} contentStyle(){return `transform:translate(calc(-50% + ${this.position.x}px),calc(-50% + ${this.position.y}px));display:${this.minimized?'none':''}`}}



