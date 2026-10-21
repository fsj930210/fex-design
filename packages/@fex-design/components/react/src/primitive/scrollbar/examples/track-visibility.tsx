import { scrollbarDemoLines } from '@fex-design/docs-shared/scrollbar-demo'
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarTrack,
  ScrollbarThumb,
  ScrollbarCorner,
} from '@fex-design/react/primitive/scrollbar'

export function ScrollbarTrackVisibilityExample() {
  return (
    <div className="flex w-full flex-wrap gap-6">
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">默认：透明轨道，滑块仍可见</h4>
        <ScrollbarRoot
          className="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <ScrollbarViewport>
            <div className="grid w-[40rem] gap-3 p-4">
              {scrollbarDemoLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis={'x'}>
            <ScrollbarTrack axis={'x'}>
              <ScrollbarThumb axis={'x'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis={'y'}>
            <ScrollbarTrack axis={'y'}>
              <ScrollbarThumb axis={'y'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner></ScrollbarCorner>
        </ScrollbarRoot>
      </section>
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">showTrack：显示轨道与交角背景</h4>
        <ScrollbarRoot
          showTrack
          className="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <ScrollbarViewport>
            <div className="grid w-[40rem] gap-3 p-4">
              {scrollbarDemoLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis={'x'}>
            <ScrollbarTrack axis={'x'}>
              <ScrollbarThumb axis={'x'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis={'y'}>
            <ScrollbarTrack axis={'y'}>
              <ScrollbarThumb axis={'y'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner></ScrollbarCorner>
        </ScrollbarRoot>
      </section>
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">showTrack + showCorner=false：仅显示轨道</h4>
        <ScrollbarRoot
          showTrack
          showCorner={false}
          className="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <ScrollbarViewport>
            <div className="grid w-[40rem] gap-3 p-4">
              {scrollbarDemoLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis={'x'}>
            <ScrollbarTrack axis={'x'}>
              <ScrollbarThumb axis={'x'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis={'y'}>
            <ScrollbarTrack axis={'y'}>
              <ScrollbarThumb axis={'y'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner></ScrollbarCorner>
        </ScrollbarRoot>
      </section>
      <section className="grid gap-3">
        <h4 className="text-sm font-medium">showTrack=false + showCorner：仅显示交角</h4>
        <ScrollbarRoot
          showCorner
          className="h-48 w-72 rounded-md border"
          autoHide={'never'}
          overflow={{ x: 'auto', y: 'auto' }}
        >
          <ScrollbarViewport>
            <div className="grid w-[40rem] gap-3 p-4">
              {scrollbarDemoLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </ScrollbarViewport>
          <ScrollbarBar axis={'x'}>
            <ScrollbarTrack axis={'x'}>
              <ScrollbarThumb axis={'x'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarBar axis={'y'}>
            <ScrollbarTrack axis={'y'}>
              <ScrollbarThumb axis={'y'}></ScrollbarThumb>
            </ScrollbarTrack>
          </ScrollbarBar>
          <ScrollbarCorner></ScrollbarCorner>
        </ScrollbarRoot>
      </section>
    </div>
  )
}
