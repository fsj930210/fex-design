import { NgComponentOutlet } from '@angular/common'
import { ChangeDetectionStrategy, Component, signal, Type } from '@angular/core'
import type { ApiValue } from '@fex-design/docs-shared/model'
import { PREVIEW_PROTOCOL, isPreviewHostMessage } from '@fex-design/docs-shared/preview-protocol'
import { BasicExample as PrimitiveBasic } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/basic'
import { CombinationsExample as PrimitiveCombinations } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/combinations'
import { DirectionExample as PrimitiveDirection } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/direction'
import { EffectsExample as PrimitiveEffects } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/effects'
import { GroupExample as PrimitiveGroup } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/group'
import { IconsExample as PrimitiveIcons } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/icons'
import { LoadingExample as PrimitiveLoading } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/loading'
import { StatesExample as PrimitiveStates } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/states'
import { SizesExample as PrimitiveSizes } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/sizes'
import { VariantsExample as PrimitiveVariants } from '../../../../packages/@fex-design/angular/src/primitive/button/examples/variants'
import { BasicExample as UiBasic } from '../../../../packages/@fex-design/angular/src/ui/button/examples/basic'
import { CombinationsExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/combinations'
import { DirectionExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/direction'
import { EffectsExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/effects'
import { GroupExample as UiGroup } from '../../../../packages/@fex-design/angular/src/ui/button/examples/group'
import { IconsExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/icons'
import { LoadingExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/loading'
import { SizesExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/sizes'
import { StatesExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/states'
import { VariantsExample } from '../../../../packages/@fex-design/angular/src/ui/button/examples/variants'

const examples: Record<string, Type<unknown>> = {
  'primitive/basic': PrimitiveBasic,
  'primitive/combinations': PrimitiveCombinations,
  'primitive/direction': PrimitiveDirection,
  'primitive/effects': PrimitiveEffects,
  'primitive/group': PrimitiveGroup,
  'primitive/icons': PrimitiveIcons,
  'primitive/loading': PrimitiveLoading,
  'primitive/sizes': PrimitiveSizes,
  'primitive/states': PrimitiveStates,
  'primitive/variants': PrimitiveVariants,
  'ui/basic': UiBasic,
  'ui/combinations': CombinationsExample,
  'ui/direction': DirectionExample,
  'ui/effects': EffectsExample,
  'ui/group': UiGroup,
  'ui/icons': IconsExample,
  'ui/loading': LoadingExample,
  'ui/sizes': SizesExample,
  'ui/states': StatesExample,
  'ui/variants': VariantsExample,
}

@Component({
  selector: '#root',
  imports: [NgComponentOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
})
export class AppComponent {
  protected readonly embedded = new URLSearchParams(location.search).get('embed') === 'true'
  protected readonly values = signal<Record<string, ApiValue>>({})
  protected readonly example =
    examples[
      location.pathname
        .split('/')
        .filter(Boolean)
        .slice(-3)
        .filter((part) => part !== 'button')
        .join('/')
    ]
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
  protected emitEvent(event: { name: string; args: unknown[] }) {
    this.send('event', event)
  }
  private send(type: string, payload: Record<string, unknown> = {}) {
    parent.postMessage({ protocol: PREVIEW_PROTOCOL, type, framework: 'angular', ...payload }, '*')
  }
}
