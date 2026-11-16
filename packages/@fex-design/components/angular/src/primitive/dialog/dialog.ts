import { createDialogController } from '@fex-design/core/dialog/create-dialog-controller'
import type { DialogOptions } from '@fex-design/core/dialog/create-dialog-controller'
import { buttonClassName } from '@fex-design/components-styles/button'
import {
  dialogBodyClassName,
  dialogCloseClassName,
  dialogContentClassName,
  dialogFooterClassName,
  dialogIconCloseClassName,
  dialogHeaderClassName,
  dialogOverlayClassName,
  dialogTitleClassName,
} from '@fex-design/components-styles/dialog'
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core'
import type { AfterContentInit, AfterViewInit, OnChanges, OnDestroy } from '@angular/core'
import { createCoreStoreSignal } from '@fex-design/angular/signals/core-store-signal'
import { createHostClassName } from '@fex-design/angular/signals/host-class'
import { XIcon } from '../../icons/x'
import { ExpandIcon } from '../../icons/expand'
import { ShrinkIcon } from '../../icons/shrink'

let nextDialogId = 1

@Component({
  selector: '[dialog]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
})
export class DialogRoot implements OnChanges, OnDestroy {
  @Input() open: boolean | undefined = undefined
  @Input() defaultOpen = false
  @Input() modal = true
  @Input() forceMount = false
  @Input() closeDelay = 140
  @Input() closeOnEscape = true
  @Input() closeOnOverlayClick = false
  @Input() fullscreen: DialogOptions['fullscreen'] = false
  @Output() fullscreenChange = new EventEmitter<boolean>()
  readonly fullscreenActive = signal(this.fullscreen === true)
  fullscreenWidth() {
    if (!this.fullscreenActive() || !this.fullscreen) return null
    const value = typeof this.fullscreen === 'object' && this.fullscreen.width !== undefined ? this.fullscreen.width : '100vw'
    return typeof value === 'number' ? `${value}px` : value
  }
  fullscreenHeight() {
    if (!this.fullscreenActive() || !this.fullscreen) return null
    const value = typeof this.fullscreen === 'object' && this.fullscreen.height !== undefined ? this.fullscreen.height : '100vh'
    return typeof value === 'number' ? `${value}px` : value
  }
  @Output() openChange = new EventEmitter<
    Parameters<NonNullable<DialogOptions['onOpenChange']>>
  >()

  private localOpen = this.defaultOpen
  readonly contentId = `dialog-content-${nextDialogId}`
  readonly titleId = `dialog-title-${nextDialogId}`
  triggerElement: HTMLButtonElement | null = null
  readonly dialog = createDialogController(this.createOptions())
  readonly snapshot = createCoreStoreSignal(this.dialog)

  private createOptions(): DialogOptions {
    return {
      open: this.open ?? this.localOpen,
      modal: this.modal,
      forceMount: this.forceMount,
      closeDelay: this.closeDelay,
      closeOnEscape: this.closeOnEscape,
      closeOnOverlayClick: this.closeOnOverlayClick,
      fullscreen: this.fullscreen,
      onFullscreenChange: (fullscreen) => this.fullscreenChange.emit(fullscreen),
      onOpenChange: (nextOpen, info) => {
        if (!nextOpen) this.fullscreenActive.set(false)
        if (this.open === undefined) {
          this.localOpen = nextOpen
          this.syncOptions()
        }
        this.openChange.emit([nextOpen, info])
      },
    }
  }

  syncOptions() {
    this.dialog.setOptions(this.createOptions())
  }

  ngOnChanges() {
    this.syncOptions()
  }

  ngOnDestroy() {
    this.dialog.destroy()
  }
}

@Directive({
  selector: 'button[dialogTrigger]',
  standalone: true,
  host: {
    type: 'button',
    '[attr.aria-haspopup]': "'dialog'",
    '[attr.aria-expanded]': 'dialogRoot.snapshot().open',
    '[attr.aria-controls]': 'dialogRoot.snapshot().open ? dialogRoot.contentId : null',
    '[attr.data-state]': "dialogRoot.snapshot().open ? 'open' : 'closed'",
  },
})
export class DialogTrigger implements AfterViewInit {
  protected readonly dialogRoot = inject(DialogRoot)
  private readonly elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef)

  ngAfterViewInit() {
    this.dialogRoot.triggerElement = this.elementRef.nativeElement
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    this.dialogRoot.syncOptions()
    this.dialogRoot.dialog.toggle({ reason: 'trigger-click', event })
  }
}

@Component({
  selector: '[dialogPortal]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
})
export class DialogPortal {}

@Component({
  selector: '[dialogOverlay]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-slot': 'dialog-overlay',
    '[class]': 'hostClassName()',
    '[style.display]': "dialogRoot.snapshot().mounted ? null : 'none'",
    '[attr.data-state]': "dialogRoot.snapshot().open ? 'open' : 'closed'",
    '[attr.data-phase]': 'dialogRoot.snapshot().phase',
  },
  template: '@if (dialogRoot.snapshot().mounted) { <div #overlay><ng-content /></div> }',
})
export class DialogOverlay implements AfterViewInit, OnDestroy {
  protected readonly dialogRoot = inject(DialogRoot)
  private readonly elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef)
  protected readonly hostClassName = createHostClassName(dialogOverlayClassName)

  @ViewChild('overlay', { read: ElementRef })
  set overlayElement(value: ElementRef<HTMLDivElement> | undefined) {
    this.dialogRoot.dialog.setOverlayElement(value?.nativeElement ?? null)
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.dialogRoot.dialog.setOverlayElement(null)
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.dialogRoot.dialog.dismiss.overlayPointer({ target: event.target, currentTarget: event.currentTarget, event })
    }
  }
}

@Component({
  selector: '[dialogContent]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'dialog',
    tabindex: '-1',
    'data-slot': 'dialog-content',
    '[id]': 'dialogRoot.contentId',
    '[attr.aria-modal]': "dialogRoot.modal ? 'true' : null",
    '[attr.aria-labelledby]': 'dialogRoot.titleId',
    '[class]': 'hostClassName()',
    '[attr.data-state]': "dialogRoot.snapshot().open ? 'open' : 'closed'",
    '[attr.data-phase]': 'dialogRoot.snapshot().phase',
    '[style.width]': 'dialogRoot.fullscreenWidth()',
    '[style.height]': 'dialogRoot.fullscreenHeight()',
  },
  template: '@if (dialogRoot.snapshot().mounted) { <div #layer><ng-content /></div> }',
})
export class DialogContent implements AfterViewInit, OnDestroy {
  protected readonly dialogRoot = inject(DialogRoot)
  private readonly elementRef = inject<ElementRef<HTMLDivElement>>(ElementRef)
  protected readonly hostClassName = createHostClassName(() =>
    `${dialogContentClassName} ${this.dialogRoot.fullscreenActive() ? 'left-0 top-0 translate-x-0 translate-y-0 rounded-none' : ''}`,
  )

  @ViewChild('layer', { read: ElementRef })
  set layerElement(value: ElementRef<HTMLDivElement> | undefined) {
    this.dialogRoot.dialog.setLayerElement(value?.nativeElement ?? null)
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.dialogRoot.dialog.setLayerElement(null)
  }

  @HostListener('keydown', ['$event'])
  keydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.dialogRoot.dialog.dismiss.escapeKey({
        target: event.target,
        currentTarget: event.currentTarget,
        event,
      })
    }
  }
}

@Component({
  selector: '[dialogHeader]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'dialog-header' },
  template: '<ng-content />',
})
export class DialogHeader {
  protected readonly hostClassName = createHostClassName(dialogHeaderClassName)
}

@Component({
  selector: '[dialogTitle]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[id]': 'dialogRoot.titleId', '[class]': 'hostClassName()', 'data-slot': 'dialog-title' },
  template: '<ng-content />',
})
export class DialogTitle {
  protected readonly dialogRoot = inject(DialogRoot)
  protected readonly hostClassName = createHostClassName(dialogTitleClassName)
}

@Component({
  selector: '[dialogBody]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'dialog-body' },
  template: '<ng-content />',
})
export class DialogBody {
  protected readonly hostClassName = createHostClassName(dialogBodyClassName)
}

@Component({
  selector: '[dialogFooter]',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '[class]': 'hostClassName()', 'data-slot': 'dialog-footer' },
  template: '<ng-content />',
})
export class DialogFooter {
  protected readonly hostClassName = createHostClassName(dialogFooterClassName)
}

@Component({
  selector: 'button[dialogClose]',
  standalone: true,
  imports: [XIcon],
  host: {
    type: 'button',
    'data-slot': 'dialog-close',
    '[class]': 'className()',
  },
  template: '<ng-content /> @if (iconOnlyValue()) { <svg xIcon class="size-4"></svg> }',
})
export class DialogClose implements AfterContentInit, AfterViewInit {
  protected readonly dialogRoot = inject(DialogRoot)
  private readonly elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef)
  protected readonly hasLabel = signal(false)
  @Input() iconOnly: boolean | string = false
  protected readonly iconOnlyValue = computed(() =>
    this.iconOnly === true || this.iconOnly === '' || this.iconOnly === 'true',
  )
  protected readonly className = computed(() =>
    this.iconOnlyValue() ? dialogIconCloseClassName : `${buttonClassName()} ${dialogCloseClassName}`,
  )

  ngAfterViewInit() {
    queueMicrotask(() =>
      this.hasLabel.set(Boolean(this.elementRef.nativeElement.textContent?.trim())),
    )
  }

  ngAfterContentInit() {
    queueMicrotask(() =>
      this.hasLabel.set(Boolean(this.elementRef.nativeElement.textContent?.trim())),
    )
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent) {
    this.dialogRoot.dialog.close({ reason: 'manual', source: 'close-button', event })
  }
}

@Component({
  selector: 'button[dialogFullscreenToggle]',
  standalone: true,
  imports: [ExpandIcon, ShrinkIcon],
  host: { type: 'button', 'data-slot': 'dialog-fullscreen-toggle', class: `${dialogIconCloseClassName} right-12` },
  template: '@if (dialogRoot.fullscreenActive()) { <svg shrinkIcon></svg> } @else { <svg expandIcon></svg> }',
})
export class DialogFullscreenToggle {
  protected readonly dialogRoot = inject(DialogRoot)

  @HostListener('document:fullscreenchange')
  fullscreenChanged() {
    this.dialogRoot.fullscreenChange.emit(document.fullscreenElement !== null)
  }

  @HostListener('click')
  async click() {
    const setting = this.dialogRoot.fullscreen
    if (!setting) return
    const mode = setting === true ? 'viewport' : setting.mode
    if (mode === 'screen') {
      const element = document.getElementById(this.dialogRoot.contentId)
      if (element && document.fullscreenElement !== element) { try { await element.requestFullscreen() } catch { this.dialogRoot.fullscreenActive.set(true); this.dialogRoot.fullscreenChange.emit(true); return } }
      else if (document.fullscreenElement) await document.exitFullscreen()
    }
    const next = mode === 'screen' ? document.fullscreenElement !== null : !this.dialogRoot.fullscreenActive()
    this.dialogRoot.fullscreenActive.set(next)
    this.dialogRoot.fullscreenChange.emit(next)
  }
}











