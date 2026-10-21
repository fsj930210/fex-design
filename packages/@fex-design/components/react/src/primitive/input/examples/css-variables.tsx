import {
  InputGroup,
  InputRoot,
  InputControl,
  InputAddonBefore,
  InputAddonAfter,
} from '@fex-design/react/primitive/input'
import { Button } from '@fex-design/react/primitive/button'

export function InputCssVariablesExample() {
  return (
    <div className="grid w-full max-w-md gap-3">
      <p>Button: Before / After</p>
      <InputGroup className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]">
        <InputAddonBefore className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]">
          <Button color="info" variant="filled">
            Before
          </Button>
        </InputAddonBefore>
        <InputRoot
          className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]"
          defaultValue="Design"
        >
          <InputControl className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]" />
        </InputRoot>
        <InputAddonAfter className="[--input-border-color:#c4b5fd] [--input-background:#faf5ff] [--input-color:#6d28d9] [--focus-border:#8b5cf6] [--input-ring-width:1px] [--input-ring-color:#ddd6fe]">
          <Button color="success" variant="solid">
            After
          </Button>
        </InputAddonAfter>
      </InputGroup>
    </div>
  )
}
