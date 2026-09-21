import { Tooltip } from '@fex-design/solid/ui/tooltip'
import { Button } from '@fex-design/solid/ui/button'
export function SemanticStylesExample() {
  return (
    <div class="flex min-h-64 items-center justify-center">
      <Tooltip
        title="这是明显放大的紫色结构化提示"
        classNames={{ root: 'rounded-2xl font-semibold shadow-xl', arrow: 'rounded-[3px]' }}
        styles={{
          root: {
            'background-color': '#7c3aed',
            color: '#fff',
            'font-size': '16px',
            'line-height': '24px',
            'max-width': '260px',
            padding: '12px 20px',
          },
          arrow: { 'background-color': '#7c3aed', width: '12px', height: '12px' },
        }}
      >
        {(trigger) => (
          <Button {...trigger.props} ref={trigger.ref}>
            查看结构化样式
          </Button>
        )}
      </Tooltip>
    </div>
  )
}
