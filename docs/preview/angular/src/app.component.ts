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
import { ChangeDetectionStrategy, Component, signal, type Type } from '@angular/core'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { observeRuntimeHeight } from '../../runtime-resize'
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

  protected readonly example = signal<Type<unknown> | null>(null)
  protected readonly loading = signal(false)
  protected readonly loadError = signal<string | null>(null)
  private loadRevision = 0
  private activeExampleKey = ''

  private async loadExample(info: { layer: string; component: string; demo: string }) {
    const key = info.layer + '/' + info.component + '/' + info.demo
    if (key === this.activeExampleKey && (this.example() || this.loading())) return
    this.activeExampleKey = key
    const revision = ++this.loadRevision
    const loader = examples[key]
    this.example.set(null)
    this.loadError.set(null)
    this.loading.set(Boolean(loader))
    if (!loader) return
    try {
      const component = await loader()
      if (revision === this.loadRevision) this.example.set(component)
    } catch (error) {
      if (revision === this.loadRevision) {
        this.loadError.set(error instanceof Error ? error.message : String(error))
      }
    } finally {
      if (revision === this.loadRevision) this.loading.set(false)
    }
  }

  constructor() {
    void this.loadExample(this.currentInfo())
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
            void this.loadExample(this.currentInfo())
          }
        }
      }
    })
    queueMicrotask(() => {
      const runtime = document.querySelector<HTMLElement>('.runtime')
      if (runtime) {
        observeRuntimeHeight(runtime, (height) => this.send('resize', { height }))
        this.send('ready')
      }
    })
  }

  private send(type: string, payload: Record<string, unknown> = {}) {
    parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'angular', ...payload }, '*')
  }
}
