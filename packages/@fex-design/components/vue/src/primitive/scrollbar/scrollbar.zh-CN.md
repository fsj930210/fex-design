# Scrollbar

从 `@fex-design/vue/primitive/scrollbar` 具名导入部件。Primitive 自带默认样式，可通过原生 class/style 覆盖；Viewport 保留原生滚动。UI 从 `@fex-design/vue/ui/scrollbar` 导出自动组合部件的 Scrollbar。

## 示例

```vue
<script setup lang="ts">
import {
  ScrollbarRoot,
  ScrollbarViewport,
  ScrollbarBar,
  ScrollbarCorner,
  ScrollbarTrack,
  ScrollbarThumb,
} from '@fex-design/vue/primitive/scrollbar'
</script>
<template>
  <ScrollbarRoot class="h-48 w-72 rounded-md border" auto-hide="never" :overflow="{ x: 'hidden' }">
    <ScrollbarViewport :overflow="{ y: 'auto' }">
      <div class="h-96 w-[36rem] p-4">Native scrolling with explicit Track and Thumb.</div>
    </ScrollbarViewport>
    <ScrollbarBar axis="y">
      <ScrollbarTrack axis="y">
        <ScrollbarThumb axis="y" />
      </ScrollbarTrack>
    </ScrollbarBar>
    <ScrollbarCorner />
  </ScrollbarRoot>
</template>
```

## API

| 属性            | 类型                                                 | 默认值        | 必填 | 说明                                           |
| --------------- | ---------------------------------------------------- | ------------- | ---- | ---------------------------------------------- |
| `overflow`      | `{ x?: 'auto' \| 'hidden'; y?: 'auto' \| 'hidden' }` | 两轴均为 auto | 否   | Root 的滚动轴配置，Viewport 可逐轴覆盖。       |
| `visibility`    | `'auto' \| 'always' \| 'hidden'`                     | 'auto'        | 否   | 滚动条可见策略，优先于 autoHide。              |
| `autoHide`      | `'never' \| 'scroll' \| 'move' \| 'leave'`           | 'scroll'      | 否   | 持续显示、滚动后隐藏、移动后隐藏或离开后隐藏。 |
| `autoHideDelay` | `number`                                             | 900           | 否   | 停止活动或指针离开后隐藏的延迟，单位毫秒。     |
| `dragScroll`    | `boolean`                                            | true          | 否   | 允许拖动滑块。                                 |
| `clickScroll`   | `false \| 'page' \| 'jump'`                          | false         | 否   | 轨道点击行为：禁用、翻页或跳转。               |
| `minThumbSize`  | `number`                                             | 24            | 否   | 滑块最小尺寸，单位像素，受轨道尺寸限制。       |
| `disabled`      | `boolean`                                            | false         | 否   | 禁用自定义滚动条交互，保留原生滚动。           |

Root 与 Viewport 都使用 `overflow={{ x, y }}` 语义：逐轴按 Viewport、Root、auto 的顺序取值。Bar、Track、Thumb 必须指定 axis。Bar 只渲染显式传入的内容，Track/Thumb 由调用方手动组合；空 Bar 不会创建这两个部件。

`autoHide`：never 持续显示；scroll 在滚动停止后延迟隐藏；move 在移动或滚动停止后延迟隐藏；leave 在指针停留时保持显示、离开后延迟隐藏。visibility 的 always/hidden 优先；overflow 为 hidden 的轴不显示滚动条。拖动期间保持显示，释放或取消后恢复策略。

所有部件透传对应框架的原生属性和 class/style（React 使用 className）。React/Solid/Svelte 使用 onScrollChange，Vue/Angular 使用 scrollChange，参数均为 `{ scrollLeft, scrollTop }`。disabled 仅禁用自定义滚动条交互，保留原生和程序化滚动。

## useScrollbar

同入口导出 `useScrollbar` 及共享选项、滚动事件和 controller 类型。适配层管理配置同步与生命周期，controller 提供 update、scrollTo、scrollBy、setOptions。setOptions 替换配置快照，省略选项恢复默认值；配置变化不重新连接监听，也不发送滚动通知。

完整绑定方式见[共享契约](../../../../../../../docs/scrollbar-primitive-contract.md)。

## CSS 变量

`--scrollbar-size`, `--scrollbar-padding`, `--scrollbar-radius`, `--scrollbar-track-color`, `--scrollbar-thumb-color`, `--scrollbar-thumb-hover-color`, `--scrollbar-thumb-active-color`, `--scrollbar-corner-color`, `--scrollbar-transition-duration`.

`showTrack` 默认为 `false`，轨道与交角背景透明；设为 `true` 使用默认浅色背景。此开关保留 DOM、布局和交互，颜色仍可通过 CSS 变量覆盖。

`showCorner` 未设置时跟随 `showTrack`，可单独设置 true/false；只控制交角背景，保留双轴滑块的预留空间。
