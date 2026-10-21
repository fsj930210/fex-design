# Scrollbar

从 `@fex-design/vue/ui/scrollbar` 具名导入 Scrollbar。UI 自动组合 Root、Viewport、各轴 Bar/Track/Thumb 与 Corner，共用 Primitive 的控制器。

Root 接受原生 class/style、overflow 和交互选项。Viewport 按轴覆盖 Root 的 overflow，未配置轴默认为 auto；其余默认值、动态配置和滚动通知遵循 Primitive。

classNames/styles 的部件键为 viewport、barX、barY、trackX、trackY、thumbX、thumbY、corner。Root 直接使用原生 class/style。通过 styles.barY.top 或 styles.barX.insetInlineStart 调整滚动条位置。表格示例自行测量换行表头，将实际高度写入 CSS 变量后设置 barY.top，Scrollbar 不承担表格测量。

viewportProps 透传 Viewport 原生属性和事件；其中的 class/style 在 classNames.viewport/styles.viewport 之后合并。

组件引用暴露 element、viewportElement 和 controller。

入口仍保留 Primitive 部件和 `useScrollbar` 导出，支持自定义组合。单独使用 Bar 时仍须显式提供 Track/Thumb。

## CSS 变量

`--scrollbar-size`, `--scrollbar-padding`, `--scrollbar-radius`, `--scrollbar-track-color`, `--scrollbar-thumb-color`, `--scrollbar-thumb-hover-color`, `--scrollbar-thumb-active-color`, `--scrollbar-corner-color`, `--scrollbar-transition-duration`.

`showTrack` 默认为 `false`，轨道与交角背景透明；设为 `true` 使用默认浅色背景。此开关保留 DOM、布局和交互，颜色仍可通过 CSS 变量覆盖。

`showCorner` 未设置时跟随 `showTrack`，可单独设置 true/false；只控制交角背景，保留双轴滑块的预留空间。
