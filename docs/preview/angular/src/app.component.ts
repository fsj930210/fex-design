function applyTheme(theme?: string) {
  if (typeof document === 'undefined') return
  const current = theme === 'light' ? 'light' : 'dark'
  const root = document.documentElement
  root.classList.remove('light', 'dark')
  root.classList.add(current)
  root.setAttribute('data-theme', current)
  root.style.colorScheme = current
}

﻿import { NgComponentOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, computed, signal, type Type } from '@angular/core'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import { examples } from './examples.generated'

@Component({
  selector: '#root',
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  private readonly query = new URLSearchParams(location.search)
  private readonly path = location.pathname.split('/').filter(Boolean)
  protected readonly embedded = this.query.get('embed') === 'true'
  private readonly initialTheme = applyTheme(this.query.get('theme') ?? undefined)
  protected readonly values = signal<Record<string, ApiValue>>({})

  private readonly initialLayer = this.query.get('layer') ?? this.path.at(-3) ?? 'ui'
  private readonly initialComponent = this.query.get('component') ?? this.path.at(-2) ?? ''
  private readonly initialDemo = this.query.get('demo') ?? this.path.at(-1) ?? ''

  protected readonly currentInfo = signal({
    layer: this.initialLayer,
    component: this.initialComponent,
    demo: this.initialDemo,
  })

  protected readonly example = computed<Type<unknown> | null>(() => {
    const info = this.currentInfo()
    if (!info.component || !info.demo) return null
    const key = `${info.layer}/${info.component}/${info.demo}`
    return examples[key] ?? null
  })

  constructor() {
    addEventListener('message', (event) => {
      if (isPreviewHostMessage(event.data)) {
        if ('theme' in event.data && event.data.theme) applyTheme(event.data.theme)
        if (event.data.type === 'render') {
          if (event.data.props) this.values.set(event.data.props)
          if (event.data.component && event.data.demo) {
            this.currentInfo.set({
              layer: event.data.layer ?? 'ui',
              component: event.data.component,
              demo: event.data.demo,
            })
          }
        }
      }
    })
    queueMicrotask(() => {
      const runtime = document.querySelector<HTMLElement>('.runtime')
      if (runtime) {
        const sendResize = () => this.send('resize', { height: Math.ceil(runtime.scrollHeight) })
        new ResizeObserver(sendResize).observe(runtime)
        this.send('ready')
        sendResize()
      }
    })
  }

  private send(type: string, payload: Record<string, unknown> = {}) {
    parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'angular', ...payload }, '*')
  }
}