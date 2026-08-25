import { Button, ButtonGroup } from '@fex-design/react/primitive/button'
import { buttonClassName } from '@fex-design/styles/button'

export function GroupExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ButtonGroup>
        <Button className={buttonClassName()}>Left</Button>
        <Button className={buttonClassName()}>Center</Button>
        <Button className={buttonClassName()}>Right</Button>
      </ButtonGroup>
      <ButtonGroup orientation="vertical" spacing={8}>
        <Button className={buttonClassName()}>Top</Button>
        <Button className={buttonClassName()}>Bottom</Button>
      </ButtonGroup>
    </div>
  )
}
