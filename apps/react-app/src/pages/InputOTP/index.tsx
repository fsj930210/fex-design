import { Link } from 'react-router'
import { BasicDemo } from './basic-demo'
import { ControlledDemo } from './controlled-demo'
import { MixedRulesDemo } from './mixed-rules-demo'
import { PasteDemo } from './paste-demo'
import { VariableLengthDemo } from './variable-length-demo'

export function InputOTPPage() {
  return <main className="min-h-screen bg-secondary-background px-2 md:px-6 py-4"><div className="mx-auto w-full max-w-5xl space-y-4">
    <header className="space-y-2"><Link className="text-sm text-muted-foreground hover:text-foreground" to="/">返回首页</Link><h1 className="text-2xl font-semibold text-foreground">InputOTP 基础组件</h1><p className="text-sm text-muted-foreground">支持独立分段长度、输入规则和跨段粘贴的验证码输入组件。</p></header>
    <div className="grid gap-4"><BasicDemo /><VariableLengthDemo /><MixedRulesDemo /><PasteDemo /><ControlledDemo /></div>
  </div></main>
}
