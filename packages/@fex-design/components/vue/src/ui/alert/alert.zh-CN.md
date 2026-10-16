# Alert

UI Alert 将 Primitive 部件组合为一个 Vue 组件，内置状态图标和关闭行为。

## 导入

```ts
import { Alert } from '@fex-design/vue/ui/alert'
```

## Props、Slots 与事件

`type` 默认 `info`，`variant` 默认 `filled`。简单标题和描述可用 `title`、`description` props；复杂内容使用 `title`、默认、`icon`、`action`、`closeIcon` slots。`showIcon` 开启内置或自定义图标，`closable` 显示关闭按钮并在隐藏前触发 `close`；调用 `preventDefault()` 可阻止隐藏。根 attrs 与事件正常透传，`classNames`、`styles` 可定制全部语义区域。

## 无障碍

内置图标为装饰内容，关闭按钮具有可访问名称。循环公告在鼠标悬停或内容聚焦时暂停，并在减少动态效果时停止。
