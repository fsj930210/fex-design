# Alert

Alert 提供状态图标、标题、说明和可选的关闭操作。

## 导入

```ts
import {
  Alert,
  AlertActionContent,
  AlertCloseIconContent,
  AlertIconContent,
  AlertTitleContent,
} from '@fex-design/angular/ui/alert'
```

## Inputs、Output 与内容投影

`alert` 宿主提供 `type`、`variant`、`title`、`description`、`showIcon`、`closable`、`classNames`、`styles` signal inputs。复杂内容通过 `[alertIcon]`、`[alertTitle]`、默认内容、`[alertAction]`、`[alertCloseIcon]` 投影。隐藏前触发 `close` output；对事件调用 `preventDefault()` 可保持显示。

## 无障碍

内置图标为装饰内容。关闭控件使用具有可访问名称的原生按钮。循环公告在悬停或聚焦时暂停，并遵循减少动态效果设置。
