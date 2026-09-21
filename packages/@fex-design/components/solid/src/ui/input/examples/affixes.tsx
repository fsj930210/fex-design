import { Input } from '@fex-design/solid/ui/input'
import { SearchIcon } from '@fex-design/solid/icons/search'
import { Button } from '@fex-design/solid/ui/button'
export function AffixesExample() {
  return (
    <div class="grid w-full gap-3">
      <Input prefix={<SearchIcon />} placeholder="Prefix" />
      <Input suffix="CNY" placeholder="Suffix" />
      <Input prefix="https://" suffix=".com" />
      <Input addonBefore="https://" addonAfter=".com" />
      <Input
        suffix={
          <Button variant="text" size="sm">
            获取验证码
          </Button>
        }
        placeholder="手机号"
      />
    </div>
  )
}
