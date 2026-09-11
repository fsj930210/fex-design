# Popover

带样式的组合式浮层，共享 Core 的触发、定位、关闭和挂载策略。

## 导入

```ts
import { Popover } from '@fex-design/solid/primitive/popover'
```

## 框架契约

触发器使用接收 props、ref 与响应式 state 的函数。读取 state 时保留 getter，内容支持 JSX 或作用域函数。

可组合部件：Popover、PopoverTrigger、PopoverPortal、PopoverContent、PopoverArrow、PopoverHeader、PopoverTitle、PopoverDescription。

独立逻辑入口 `createPopover` 从本组件入口导出，创建 Core controller 的框架适配。内部 Context 读取器不代替独立逻辑入口。

## 示例

1. 基本使用
2. hover、focus、click、context-menu 及组合
3. 十二个方向
4. 箭头展示
5. 默认 body 与自定义挂载容器
6. 受控与非受控、浮层内关闭、表单草稿保留和销毁
7. sideOffset 与 alignOffset

## 公共 API

Primitive 与 UI 的行为类型统一定义在 @fex-design/core/popover/types。两层以及五个框架共享以下语义。

| API | 默认值 | 含义 |
| --- | --- | --- |
| open / defaultOpen | — / false | 受控状态 / 非受控初始状态 |
| trigger | ['click'] | hover, focus, click, context-menu |
| placement | bottom | top, topLeft, topRight, bottom, bottomLeft, bottomRight, left, leftTop, leftBottom, right, rightTop, rightBottom |
| side / align | — | top, right, bottom, left / start, center, end |
| sideOffset / alignOffset | 6 / 0 | 浮层与触发元素距离 / 面板与触发元素对齐偏移，px |
| arrow / arrowPadding | false / 16 | 箭头显示 / 边缘留白，px |
| avoidCollisions / collisionPadding | true / 8 | 碰撞调整 / 边界留白，px |
| hoverOpenDelay / hoverCloseDelay | 0 / 80 | hover 打开 / 关闭延迟，ms |
| closeDelay | 140 | 关闭动画保留时长，ms |
| lazyMount | true | 首次打开前不创建内容 |
| destroyOnHidden | false | 关闭动画结束后是否卸载内容 |
| getPopupContainer | body | 由触发元素解析挂载目标 |

完整属性及事件表见官网 Popover API。原生属性、事件和元素引用遵循各框架契约，延迟单位统一为 ms。

## 挂载容器

默认挂到触发元素所属文档的 body。UI 与 Primitive 根组件均支持 getPopupContainer；内部 Portal 自动读取该配置。Primitive 的 PopoverPortal 也可直接传 container，优先级为 container → getPopupContainer → body。

## 挂载生命周期

| lazyMount | destroyOnHidden | 首次打开前 | 关闭后 |
| --- | --- | --- | --- |
| true | false | 不挂载 | 保留 DOM 和内部状态 |
| true | true | 不挂载 | 卸载，再次打开重新创建 |
| false | false | 提前挂载 | 保留 DOM 和内部状态 |
| false | true | 提前挂载 | 卸载，再次打开重新创建 |

默认策略适合表单：第一次打开才创建，关闭后保留草稿。destroyOnHidden 只卸载内容子树，不会清除调用方存储的外部状态。

## 可访问性

触发器同步 aria-expanded 与 aria-controls。PopoverTitle 与 PopoverDescription 为浮层提供标题和描述关联；自定义结构时应提供等价的可访问名称。隐藏保留的面板不能交互；Escape 和外部指针关闭由 Core 的弹层顺序统一处理。
