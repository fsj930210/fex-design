import { Spinner } from '@fex-design/react/primitive/spinner'
import { SwitchRoot, SwitchContent, SwitchThumb } from '@fex-design/react/primitive/switch'

export function SwitchSemanticStylesExample() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">rounded</span>
        <div className="flex flex-wrap items-center gap-3">
          <SwitchRoot
            shape="rounded"
            defaultChecked
            className="ring-2"
            style={{ backgroundColor: '#0f766e', color: '#fff' }}
            aria-label="rounded 结构化样式"
          >
            <SwitchContent
              state="checked"
              className="font-semibold"
              style={{ letterSpacing: '0.08em' }}
            >
              开启
            </SwitchContent>
            <SwitchContent
              state="unchecked"
              className="font-semibold"
              style={{ letterSpacing: '0.08em' }}
            >
              关闭
            </SwitchContent>
            <SwitchThumb
              className="shadow-lg"
              style={{ backgroundColor: '#ccfbf1', color: '#0f766e' }}
            ></SwitchThumb>
          </SwitchRoot>
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">pill</span>
        <div className="flex flex-wrap items-center gap-3">
          <SwitchRoot
            shape="pill"
            defaultChecked
            className="ring-2"
            style={{ backgroundColor: '#0f766e', color: '#fff' }}
            aria-label="pill 结构化样式"
          >
            <SwitchContent
              state="checked"
              className="font-semibold"
              style={{ letterSpacing: '0.08em' }}
            >
              开启
            </SwitchContent>
            <SwitchContent
              state="unchecked"
              className="font-semibold"
              style={{ letterSpacing: '0.08em' }}
            >
              关闭
            </SwitchContent>
            <SwitchThumb
              className="shadow-lg"
              style={{ backgroundColor: '#ccfbf1', color: '#0f766e' }}
            ></SwitchThumb>
          </SwitchRoot>
        </div>
      </section>
      <section className="grid gap-2">
        <span className="text-sm text-muted-foreground">加载图标</span>
        <SwitchRoot
          loading
          defaultChecked
          className="[--switch-track-checked-background:#0f766e] [--switch-thumb-background:#ccfbf1]"
          aria-label="加载图标"
        >
          <SwitchThumb>
            <Spinner className="text-violet-600" aria-hidden="true" />
          </SwitchThumb>
        </SwitchRoot>
      </section>
    </div>
  )
}
