import { Component } from '@angular/core'
import { DialogRoot, DialogPortal, DialogOverlay, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose, DialogFullscreenToggle } from '@fex-design/angular/primitive/dialog'
import { Button } from '@fex-design/angular/primitive/button'
@Component({selector:'dialog-fullscreen-primitive-example',standalone:true,imports:[DialogRoot,DialogPortal,DialogOverlay,DialogContent,DialogHeader,DialogTitle,DialogBody,DialogFooter,DialogClose,DialogFullscreenToggle,Button],templateUrl:'./fullscreen.html'})
export class DialogFullscreenExample { open=false; mode: 'viewport' | 'screen' = 'viewport' }
