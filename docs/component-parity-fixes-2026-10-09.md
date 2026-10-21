# 组件一致性修复记录（2026-10-09）

已修改上轮复查报告中的 A–K 共 11 组问题，覆盖 17 个组件族的 UI、相关 Primitive 和公共逻辑。当前结论为源码修复及静态检查完成，不代表五框架运行验收完成。

| 复查项            | 修改结果                                                                                                                                                                    |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| A / InputNumber   | Svelte UI 与 Primitive Root 用 `$derived` 解构同一个 props 对象，保留初始受控模式判断，同时持续读取更新后的参数和回调。                                                     |
| B / Skeleton      | Vue 明确保留 loading 的 undefined；仅显式 false 时显示正文。                                                                                                                |
| C / Spinner       | Vue 明确保留 spinning 的 undefined，使独立、内容、遮罩三种模式均可进入。                                                                                                    |
| D / Tooltip       | Vue UI 与 Primitive Root 同步保留可选 Boolean 的 undefined，交给 core 应用默认定位和挂载行为。                                                                              |
| E / ref           | React 公共 useComposedRef 根据输入 ref 的变化生成对应回调，让 React 清理旧绑定并绑定新 ref；保留 React 19 cleanup。Popover、Tooltip、Spinner 等调用方统一受益。             |
| F / Button        | Angular loading 指示器使用一个模板片段，按 iconPlacement 在正文之前或之后实例化，保留自定义指示器投影。                                                                     |
| G / 样式          | Solid Alert、Anchor、Avatar、AvatarGroup、Card、Empty、InputNumber、Radio、Switch、Tag 使用已有 mergeStyle，保留原生字符串和对象 style。                                    |
| H / Checkbox      | Solid UI 将用户 style 接到 Root，与 styles.root 合并，避免被 Control 的 style 覆盖。                                                                                        |
| I / Skeleton 样式 | Solid 同时合并字符串 style 与 styles.root。                                                                                                                                 |
| J / Badge         | Svelte 为 CSS 声明拼接补充分隔符，并将独立 dot 的用户样式与 semantic 样式合并。                                                                                             |
| K / 原生属性      | Svelte AspectRatio、CheckboxGroup、RadioGroup 扩展原生 HTML 属性类型；AvatarGroup 的 Primitive 和 UI 都支持原生属性与 bindable ref，UI 透传到实际根元素并去掉额外 wrapper。 |

此外，沿 InputNumber 逻辑入口补齐了两处问题：

- Vue Primitive Root 的 controlled 保留 undefined，使直接使用 Primitive 时的受控模式推断生效。
- 五框架 InputNumber 的 input、blur、clear、increment、decrement 和键盘入口共用 core 的交互许可与步进边界判断；禁用、只读、已取消事件以及步进上下限不再仅依赖内置 DOM 控件拦截。commit 保留显式归一化接口的用途。

关键公共逻辑：[InputNumber core](D:/code/fex-design/packages/@fex-design/core/src/input-number/value.ts:3)、[React useComposedRef](D:/code/fex-design/packages/@fex-design/components/react/src/hooks/use-composed-ref.ts:14)。

静态检查：33 个本轮修改的源码文件通过 TS/Vue/Svelte 语法解析、相对导入目标检查、品牌前缀扫描和 300 行限制检查；Angular Button 模板单独通过模板语法解析。公开子路径导入也检查到实际 exports 和文件目标。

按仓库约定没有新增测试、调用浏览器、启动服务或运行 typecheck、lint、build、format。未修改 Calendar、DatePicker 的并行工作，也未清理已有改动。
