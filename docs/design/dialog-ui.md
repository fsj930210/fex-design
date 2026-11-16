# Dialog UI 设计

## 目标

UI Dialog 基于 Primitive Dialog 组合默认可用的弹窗体验，提供标题、关闭按钮、内容区和确定/取消操作，同时保留完全自定义 Footer、关闭按钮、尺寸和窗口行为的能力。

Primitive 负责 Root、Overlay、Content、Title、Header、Body、Footer、Close 的语义和生命周期。UI 负责默认组合、按钮文案、样式变体、异步确认和窗口增强能力。

## 默认结构

```text
DialogRoot
├─ DialogTrigger
└─ DialogPortal
   ├─ DialogOverlay
   └─ DialogContent
      ├─ DialogHeader
      │  ├─ DialogTitle
      │  └─ DialogClose（默认右上角关闭按钮）
      ├─ DialogBody
      └─ DialogFooter
         ├─ DialogClose（取消）
         └─ Button（确定）
```

UI 默认渲染 Overlay、右上角关闭按钮和 Footer。调用方可以关闭这些默认区域并提供自己的组合。

## UI Props

```ts
interface DialogProps {
  open?: boolean
  defaultOpen?: boolean
  title?: ReactNode
  children?: ReactNode
  footer?: ReactNode | null
  closable?: boolean
  closeIcon?: ReactNode
  overlay?: boolean | { closable?: boolean }
  keyboard?: boolean
  width?: string | number
  height?: string | number
  fullscreen?: boolean | { mode?: 'viewport' | 'screen' }
  onFullscreenChange?: (fullscreen: boolean) => void
  destroyOnHidden?: boolean
  confirmLoading?: boolean
  okText?: ReactNode
  cancelText?: ReactNode
  okButtonProps?: ButtonProps
  cancelButtonProps?: ButtonProps
  onOk?: (close: () => void) => void | Promise<void>
  onCancel?: (close: () => void) => void | Promise<void>
  onOpenChange?: (open: boolean, info: DialogChangeInfo) => void
}
```

UI props 映射到 Primitive 的方式：

| UI prop | Primitive 组合 |
| --- | --- |
| `overlay` | 是否渲染 `DialogOverlay` |
| `overlay.closable` | `closeOnOverlayClick` |
| `keyboard` | `closeOnEscape` |
| `closable` | 是否组合 Header 内的 `DialogClose` |
| `title` | `DialogTitle` 内容 |
| `footer={null}` | 不渲染 `DialogFooter` |
| `width` / `height` | Content 的 CSS 变量 |
| `fullscreen` | UI 全屏状态 |
| `destroyOnHidden` | Content 子树在关闭完成后销毁 |

UI 和 Primitive 都使用 `DialogOverlay` 作为部件名称，背景通过 `--overlay-background` 控制。

## Footer 行为

默认 Footer 提供：

```text
取消 -> DialogClose
确定 -> Button + onOk
```

`onOk` 支持异步操作。Promise pending 时，确定按钮进入 loading；resolve 后关闭 Dialog，reject 后保持打开并交由 UI 展示错误。

当 `footer={null}` 时，不渲染 Footer。传入自定义节点时，UI 不再生成默认确定/取消按钮，调用方自行组合 `DialogClose` 和业务按钮。

## 关闭行为

默认值：

```ts
closable = true
overlay = true
overlay.closable = true
keyboard = true
```

右上角关闭按钮、取消按钮、Overlay 点击和 Escape 都走同一个 Root controller。`onCancel` 只负责业务回调，实际关闭由 UI 在回调成功后调用。

确认型场景可以关闭 Overlay 点击和 Escape：

```tsx
<Dialog
  overlay={{ closable: false }}
  keyboard={false}
  onOk={submit}
/>
```

## 位置和尺寸

默认 Content 居中显示。UI 提供：

- `width`：设置 Content 宽度；
- `height`：设置 Content 高度；
- `fullscreen="viewport"`：填满浏览器视口并移除圆角；
- `fullscreen="screen"`：调用浏览器 Fullscreen API，进入真正的屏幕全屏；
- `style` / `className`：覆盖位置、宽高和布局。

Dialog 默认就是水平、垂直居中，因此不提供 `centered` prop。需要改变位置时直接通过 `className` 或 `styles.content` 调整。

Primitive Content 不提供 `size`、`max-width`、`min-width` 或 fullscreen 功能，避免 resize 场景需要覆盖内置限制。全屏是 UI Dialog 的基础能力，由 UI 管理状态和切换控件。

## 全屏增强

全屏属于 Primitive 和 UI 都需要支持的基础能力。Primitive 公开状态和模式，框架适配器负责连接视口样式或浏览器 Fullscreen API，UI 负责提供默认切换按钮。

默认操作顺序：

```text
[全屏/退出全屏] [关闭]
```

全屏按钮位于右上角关闭按钮的左侧。建议作为 UI 内部部件实现：

```text
DialogHeader
  DialogTitle
  DialogHeaderActions
    DialogFullscreenToggle
    DialogClose
```

`fullscreen` 是独立于 `open` 的受控状态，支持简单布尔值或带模式的配置对象：

```ts
fullscreen={true}
fullscreen={{ mode: 'viewport' }}
fullscreen={{ mode: 'screen' }}
```

`viewport` 让 Dialog 填满浏览器视口；`screen` 由框架适配器调用浏览器 Fullscreen API。`onFullscreenChange` 在状态变化后通知调用方。Primitive 不单独暴露 `fullscreenMode`，也不增加 `defaultFullscreen`。

## 窗口增强

拖动、resize、最小化和最大化不进入基础 UI Dialog 的 Root 状态。第一阶段只在 examples 中展示组合方式：

```text
Dialog + useDraggable
Dialog + useResize
Dialog + useMinmax
```

暂不新增 `DraggableDialog`、`ResizableDialog` 等派生导出。增强能力只修改 Content 的位置或尺寸，并通过 CSS 变量和宿主 class 接入，不复制 Dialog 的 open 状态。

## 销毁和焦点

默认关闭后保留子树，保证再次打开时表单状态和局部状态不被重置。`destroyOnHidden` 为 true 时，在关闭动画结束后销毁 Content 子树。

打开时记录 Trigger，关闭后默认恢复焦点。若 Trigger 已卸载，则跳过恢复。焦点管理由 UI 复用现有 Primitive/controller 能力，不在 Footer 或按钮中重复实现。

## 语义和样式变量

UI 保持 Primitive 的语义结构：

```text
dialog-root
dialog-overlay
dialog-content
dialog-header
dialog-title
dialog-body
dialog-footer
dialog-close
```

UI 提供语义部件定制入口：

```ts
classNames?: Partial<Record<DialogSemanticSlot, string>>
styles?: Partial<Record<DialogSemanticSlot, CSSProperties>>
```

`DialogSemanticSlot` 至少包含 `root`、`overlay`、`content`、`header`、`title`、`body`、`footer`、`close`。`classNames` 用于 class 合并，`styles` 用于 style 合并；两者不能替代 Primitive 的公开部件组合。

基础变量控制范围保持克制：

```css
--dialog-width
--dialog-height
--dialog-z-index
--dialog-motion-duration
--dialog-motion-ease
--overlay-background
```

不新增拖动坐标、最小化尺寸或 resize 状态变量；这些状态归 `useDraggable`、`useResize` 和 UI 增强组合管理。

## 与 Ant Design 的关系

Ant Design Modal 默认提供 OK/Cancel Footer、关闭按钮、overlay、宽度、位置、异步确认和销毁配置；Fex UI 采用相同的易用默认值，但把这些能力建立在 Primitive 的显式组合之上，使 `footer={null}`、自定义 Footer、无 Overlay、全屏增强和窗口增强都能保持同一套 Root 状态。Ant Design 也支持通过 `footer={null}` 取消默认按钮，并提供 `width`、`closable`、`keyboard`、`destroyOnHidden`、`classNames` 和 `styles` 等能力。[Ant Design Modal API](https://ant.design/components/modal/?locale=en-US)
