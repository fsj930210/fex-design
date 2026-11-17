import { dialogIconCloseClassName } from '@fex-design/components-styles/dialog'
import { Component } from '@angular/core'
import { Button } from '@fex-design/angular/primitive/button'
import { Move } from '@fex-design/angular/directives/move'
import { MinusIcon } from '@fex-design/angular/icons/minus'
import { SquareIcon } from '@fex-design/angular/icons/square'
import {
  DialogRoot,
  DialogPortal,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogActions,
  DialogClose,
  DialogBody,
  DialogFooter,
} from '@fex-design/angular/primitive/dialog'
@Component({
  selector: 'dialog-minimax-primitive-example',
  standalone: true,
  imports: [
    Button,
    Move,
    MinusIcon,
    SquareIcon,
    DialogRoot,
    DialogPortal,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogActions,
    DialogClose,
    DialogBody,
    DialogFooter,
  ],
  templateUrl: './minimax.html',
})
export class DialogMinimaxExample {
  readonly actionClassName = dialogIconCloseClassName
  open = false
  rect = { x: 0, y: 0, width: 480, height: 300 }
  mode: 'normal' | 'minimized' | 'maximized' = 'normal'
  bar = { x: 16, y: 16 }
  minimize() {
    this.bar = { x: 16, y: Math.max(0, window.innerHeight - 56) }
    this.mode = 'minimized'
  }
  show() {
    const width = Math.min(480, window.innerWidth - 32)
    const height = Math.min(300, window.innerHeight - 56)
    this.rect = {
      x: (window.innerWidth - width) / 2,
      y: (window.innerHeight - height) / 2,
      width,
      height,
    }
    this.mode = 'normal'
    this.open = true
  }
  panel(element: HTMLElement) {
    return element.closest<HTMLElement>('[data-slot="dialog-content"]')
  }
  setOpen(event: unknown) {
    this.open = Array.isArray(event) ? Boolean(event[0]) : Boolean(event)
  }
  get position() {
    return this.mode === 'minimized' ? this.bar : { x: this.rect.x, y: this.rect.y }
  }
  move(point: { x: number; y: number }) {
    if (this.mode === 'minimized') {
      this.bar = point
      return
    }
    this.rect = { ...this.rect, ...point }
  }
  get windowClass() {
    return (
      'group/minimax ' +
      (this.mode === 'minimized'
        ? '[&_[data-slot=dialog-header]]:text-sm [&_[data-slot=dialog-title]]:text-sm [&_[data-slot=dialog-header]]:px-3 [&_[data-slot=dialog-header]]:py-[7px] [&_[data-slot=dialog-header]]:border-b-0 [&_[data-slot=dialog-header]]:rounded-[inherit] [&_[data-slot=dialog-actions]]:top-2 [&_[data-slot=dialog-actions]]:end-2'
        : '')
    )
  }
  get style() {
    return {
      left:
        this.mode === 'maximized'
          ? '0px'
          : this.mode === 'minimized'
            ? this.bar.x + 'px'
            : this.rect.x + 'px',
      top:
        this.mode === 'maximized'
          ? '0px'
          : this.mode === 'minimized'
            ? this.bar.y + 'px'
            : this.rect.y + 'px',
      width:
        this.mode === 'maximized'
          ? window.innerWidth + 'px'
          : this.mode === 'minimized'
            ? '280px'
            : this.rect.width + 'px',
      height:
        this.mode === 'maximized'
          ? window.innerHeight + 'px'
          : this.mode === 'minimized'
            ? '40px'
            : this.rect.height + 'px',
      overflow: this.mode === 'minimized' ? 'visible' : 'hidden',
      translate: 'none',
      transform: 'none',
      transitionProperty: 'opacity, scale',
      maxWidth: 'none',
      maxHeight: 'none',
      display: 'flex',
      flexDirection: 'column',
    }
  }
}
