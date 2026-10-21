# 组件组合配置迁移

## 2026-10-20 样式示例覆盖

- 当前 API 文档中的 28 个组件族（排除 Menu），在 Primitive/UI、五框架中均提供 `css-variables` 和 `semantic-styles`，合计 560 个入口。本次补充 330 个缺失入口。
- 样式按 DOM 和直接子组件归属配置；浮层分别设置作用域。Primitive 使用部件的原生 class/style 与子组件配置，UI 使用已有的结构化样式和子组件配置入口，不为示例增加跨层样式快捷键。
- 文档统一使用上述两个场景 ID；`styling`、`styles`、`structured` 中原有的重复结构化样式目录已归一，旧示例源码保留。
- 本节仅记录示例与文档覆盖。语法、命名、入口路径和文档生成检查不等于类型、构建或渲染验证，也不代表下文尚待处理的组合 API 迁移已经完成。

本迁移尚未完成。此文件记录边界、已开始的工作和剩余检查，不能作为五框架完成或运行验证的证明。

## 范围与规则

- 父组件范围取 `docs/api/primitive` 与 `docs/api/ui` 已有文档的并集，排除 Menu。
- 同族 Primitive 部件也属于组件组合，不因目录相同而豁免。只把父组件直接写出的原生 DOM 视为其自身 DOM。
- 每个组件只接收直接子组件配置，间接配置按子组件原有公开契约继续下传。
- 相同组件的不同实例按业务角色区分；不按位置编号，也不新增穿透多层的样式快捷键。
- 数据、受控状态、提交、禁用及约束的所有权不能被子配置覆盖。类型限制与实际转发规则必须一致。
- Primitive/UI 均在“结构化样式”和“CSS 变量”中展示自身及直接子组件的定制，五框架场景一致。
- `classNames/styles` 与 CSS 变量必须检查实际 DOM 归属；Portal 内部样式不能假定从外层继承。
- 透明委托、显式组合、默认子内容及自定义内容入口都需要记录具体配置路径，不能只检查 import 数量。

## 当前工作记录

| 组件                    | 已开始的改动                                                                                                        | 尚需完成的检查与迁移                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Input                   | InputSearch 前后 Button 的独立配置；两层五框架示例                                                                  | InputRoot、Control、Group、前后缀等同族部件；全部配置转发与既有映射归属       |
| InputNumber             | 前后缀、Control、Actions、增减和清除配置；两层五框架示例                                                            | Root 的透明委托边界；底层 Button 的实际契约；旧样式映射迁移                   |
| Switch                  | spinnerProps、checkedContentProps、uncheckedContentProps、thumbProps；两层五框架示例                                | Root 的透明委托边界；旧样式映射迁移                                           |
| Calendar                | Header 的年/月 SelectRoot、Trigger、Content，导航按钮、RadioGroup 和模式按钮配置；两层五框架示例                    | Root/Grid/Cell 等其余同族部件；旧样式映射迁移                                 |
| Pagination              | SelectRoot/Trigger/Content 与 InputNumber Root/Actions/增减配置；两层五框架示例；数值约束过滤                       | 其余同族部件；原生属性与事件的完整转发；旧样式映射迁移                        |
| Select                  | UI triggerProps/contentProps；Trigger → Value → Tag/TagAction；Content → Portal/PopoverContent/List；两层五框架示例 | React Input 组合路径；List 内的默认组件；类型与原生属性完整性；旧样式映射迁移 |
| TimePicker              | 单选与范围的 Content/Panel/各时间列配置，列 → 通用列 → ScrollbarRoot，范围底部按钮；两层五框架示例                  | Trigger、Portal、Root 及列内其余部件；旧样式映射迁移                          |
| Card                    | Header/Title/Description/Extra/Content/Footer 配置；两层五框架示例；Angular 部件独立文件与原生 class                | Root 透明委托；旧样式映射迁移                                                 |
| Scrollbar               | 横向/纵向 Bar、Track、Thumb 与 Corner 独立配置，默认 Viewport 配置；两层五框架示例                                  | 原生属性完整性；旧样式映射迁移                                                |
| Tag                     | UI actionProps；两层五框架示例，保留关闭事件反馈                                                                    | Root 透明委托；默认图标的原生替换路径；旧样式映射迁移                         |
| Button                  | 开始/结束 ButtonIcon 和默认 LoadingIcon 独立配置；两层五框架示例                                                    | Root、ButtonGroup 的完整委托审计；其余默认内容和原生事件                      |
| DatePicker              | 保留既有 inputProps/calendarProps/popoverProps，未完成新规则审计                                                    | Calendar、TimePicker、Input、Popover、Tag、Button 与同族部件的完整迁移        |
| 其余已有 API 文档的组件 | 待按澄清后的同族边界逐个审计                                                                                        | 不能因首次跨族 import 扫描无结果就认定不需要迁移                              |

## 完成门槛

1. 按公开组件记录直接组件调用、配置路径、受保护属性和实际落点。
2. 完成五框架的实现、公开类型、入口导出与原生事件处理。
3. 同步两层示例、manifest、API 文档、源码预览及 Angular 注册。
4. 检查 CSS 变量的作用域、浮层、同类多实例隔离和旧样式映射。
5. 扫描新增/修改源码的命名、实际引用、语法和文件长度。

遵守仓库约定：未获明确要求时不写测试，不运行 UI 测试、typecheck、lint、build 或 format，不启动服务，不修改 Menu 的实现和示例。

## 当前源码核对记录

- 子组件定制示例合并到 `semantic-styles` 和 `css-variables`，不再提供独立场景。
- 对上述相关改动中的 770 个源码文件做了语法、重复 JSX 属性、品牌命名和文件长度扫描，未发现问题；另有 114 个 Angular 模板通过语法解析。这些检查不执行类型检查或组件交互。
- 已重新生成 Angular 示例注册和本批组件的 1475 份示例源码。生成成功不作为运行效果、类型正确性或场景对齐的证明。
- DatePicker、其余已有 API 文档的组合组件，以及旧的跨部件样式映射和 CSS 变量作用域仍需继续迁移；不能将本批进度表述为全量完成。
