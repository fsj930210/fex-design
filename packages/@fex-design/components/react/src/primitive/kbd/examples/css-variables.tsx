import { Kbd, KbdGroup } from '@fex-design/react/primitive/kbd'
export function KbdCssVariablesExample() {
  return (
    <KbdGroup
      className="[--muted-background:#ede9fe] [--muted-foreground:#6d28d9] [--border:#c4b5fd]"
      aria-label="键盘快捷键"
    >
      <Kbd className="[--muted-background:#ede9fe] [--muted-foreground:#6d28d9] [--border:#c4b5fd]">
        Ctrl
      </Kbd>
      <Kbd className="[--muted-background:#ede9fe] [--muted-foreground:#6d28d9] [--border:#c4b5fd]">
        +
      </Kbd>
      <Kbd className="[--muted-background:#ede9fe] [--muted-foreground:#6d28d9] [--border:#c4b5fd]">
        K
      </Kbd>
    </KbdGroup>
  )
}
