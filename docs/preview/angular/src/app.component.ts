import { NgComponentOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal } from '@angular/core'
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
  protected readonly embedded = this.query.get('embed') === 'true'
  protected readonly values = signal<Record<string, ApiValue>>({})
  protected readonly example =
    examples[
      `${this.query.get('layer') ?? location.pathname.split('/').filter(Boolean).at(-3)}/${this.query.get('component') ?? location.pathname.split('/').filter(Boolean).at(-2)}/${this.query.get('demo') ?? location.pathname.split('/').filter(Boolean).at(-1)}`
    ] ?? null

  constructor() {
    addEventListener('message', (event) => {
      if (isPreviewHostMessage(event.data)) this.values.set(event.data.props)
    })
    queueMicrotask(() => {
      const runtime = document.querySelector<HTMLElement>('.runtime')!
      const sendResize = () => this.send('resize', { height: Math.ceil(runtime.scrollHeight) })
      new ResizeObserver(sendResize).observe(runtime)
      this.send('ready')
      sendResize()
    })
  }

  private send(type: string, payload: Record<string, unknown> = {}) {
    parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'angular', ...payload }, '*')
  }
}
