import { Tooltip } from '@fex-design/react/ui/tooltip'
import { Button } from '@fex-design/react/ui/button'
export function SemanticStylesExample() {
  return (
    <div className="flex min-h-64 items-center justify-center">
      <Tooltip
        title="这是明显放大的紫色结构化提示"
        classNames={{ root: 'rounded-2xl font-semibold shadow-xl', arrow: 'rounded-[3px]' }}
        styles={{
          root: {
            backgroundColor: '#7c3aed',
            color: '#fff',
            fontSize: 16,
            lineHeight: '24px',
            maxWidth: 260,
            padding: '12px 20px',
          },
          arrow: { backgroundColor: '#7c3aed', width: 12, height: 12 },
        }}
      >
        <Button>查看结构化样式</Button>
      </Tooltip>
    </div>
  )
}
