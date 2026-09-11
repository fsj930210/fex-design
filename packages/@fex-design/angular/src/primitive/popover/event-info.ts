import type { OverlayEventInfo } from '@fex-design/core/overlay/types'

export function eventInfo(event: Event): OverlayEventInfo {
  // Angular HostListener 传入原生事件，这里统一转换成 core 使用的框架无关事件快照。
  return {
    target: event.target,
    currentTarget: event.currentTarget,
    clientX: 'clientX' in event && typeof event.clientX === 'number' ? event.clientX : undefined,
    clientY: 'clientY' in event && typeof event.clientY === 'number' ? event.clientY : undefined,
    button: 'button' in event && typeof event.button === 'number' ? event.button : undefined,
    pointerType: 'pointerType' in event && typeof event.pointerType === 'string' ? event.pointerType : undefined,
    event,
    preventDefault: event.preventDefault.bind(event),
    stopPropagation: event.stopPropagation.bind(event),
  }
}
