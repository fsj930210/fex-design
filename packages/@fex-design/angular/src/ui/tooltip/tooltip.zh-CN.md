# Angular Ui Tooltip

基于共享浮层控制器构建的可访问 hover/focus 提示。UI 组装默认触发与内容结构，并增加语义样式。

## 导入

    import { Tooltip } from '@fex-design/angular/ui/tooltip'

## 组件

| 组件 | 用途 |\n| --- | --- |\n| Tooltip | 开箱即用的触发与内容组合。 |

## 示例

| 名称          | 覆盖内容                        |
| ------------- | ------------------------------- |
| basic         | 触发元素与可访问 Tooltip 内容。 |
| controlled    | 受控打开状态。                  |
| placement     | 十二个方位。                    |
| color         | 自定义内容颜色。                |
| direction     | LTR 与 RTL 行为。               |
| css-variables | CSS 变量定制。                  | \n  | semantic-styles | 结构化 classNames 与 styles。 |

## API

| 名称                             | 类型                     | 默认值 | 说明                      |
| -------------------------------- | ------------------------ | ------ | ------------------------- |
| open / defaultOpen               | boolean                  | false  | 受控 / 非受控打开状态。   |
| disabled                         | boolean                  | false  | 禁用 Tooltip 触发。       |
| placement                        | TooltipPlacement         | top    | 十二个快捷方位。          |
| side / align                     | Side / Align             | —      | 明确指定浮层方向与对齐。  |
| sideOffset / alignOffset         | number                   | 6 / 0  | 距离与对齐偏移，单位 px。 |
| avoidCollisions                  | boolean                  | true   | 空间不足时调整位置。      |
| hoverOpenDelay / hoverCloseDelay | number                   | 0 / 80 | hover 延迟，单位 ms。     |
| closeDelay                       | number                   | 140    | 为退出动画保留挂载时间。  |
| getPopupContainer                | (trigger) => HTMLElement | body   | 解析 Portal 容器。        |
| onOpenChange                     | (open, info) => void     | —      | 返回状态请求及原因。      |

## 可访问性

内容使用 role="tooltip"。仅在内容挂载时为触发元素设置 aria-describedby。键盘聚焦可打开提示，Escape 关闭且不会丢失焦点。
