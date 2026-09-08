import { Input } from '@fex-design/react/ui/input'
import { SearchIcon } from '@fex-design/react/icon/search'
import { Button } from '@fex-design/react/ui/button'
export function AffixesExample() {
  return (
    <div className="grid w-full gap-3">
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
