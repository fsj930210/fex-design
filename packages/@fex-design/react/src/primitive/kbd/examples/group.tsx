import { Kbd, KbdGroup } from '@fex-design/react/primitive/kbd'
export function Group() {
  return (
    <KbdGroup aria-label="键盘快捷键">
      <Kbd>Ctrl</Kbd>
      <Kbd>+</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  )
}
