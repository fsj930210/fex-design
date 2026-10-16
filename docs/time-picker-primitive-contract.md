# TimePicker Primitive 契约

参考 DatePicker，Primitive 自带可覆盖的默认样式和 Input Trigger；不要求调用方从零组装输入框。Trigger 提供自定义内容绑定，Content 可替换为调用方容器，时间列允许自定义选项内容。公开逻辑入口可以独立创建时间状态，不依赖内部 Context。

core 负责时间值、输入草稿、格式化和解析、受控更新、禁用/只读约束；框架层只负责响应式订阅、DOM 引用、事件和滚动。UI 仅按 format 组装 Primitive，不重复维护状态。

value 为 undefined 表示非受控；null 是受控空值。defaultValue 仅创建时读取。setOptions 更新配置不触发 change；输入有效且不被禁用时提交，不完整输入只更新草稿。禁用和只读阻止修改，禁用同时阻止默认浮层打开。列选择不会自动关闭面板。

上下键在有效选项间移动焦点，Enter/Space 使用原生按钮激活。初始导航从当前选中项开始；disabled/readOnly 下不移动。滚动以实际选项 offsetTop 对齐，并尊重 reduced-motion。

每个部件的 class/style 属于其宿主。Root 不为子部件引入聚合样式；UI 通过原生内容替换入口组合已有 Primitive。

本轮仅进行源码审查与静态检查，不运行浏览器、测试、typecheck、lint、build 或 format；静态一致性不代表运行时验收。

## 本轮落地

- 五框架统一通过 setOptions 更新 core 配置；Vue 不再把缺省 value 锁成受控，Angular 在 OnChanges/OnInit 中初始化输入配置。
- React/Vue/Solid/Svelte 提供独立 useTimePicker，Angular 提供 TimePickerState；私有 Context 不再作为公开逻辑入口。
- Trigger 保留默认 Input，增加原生自定义内容；选项内容可替换，事件与按钮语义保留在列中。
- Portal 与 Content 显式拆分，UI 默认组合两者；旧调用方需要在 Content 外包 TimePickerPortal，Angular 使用 ng-template[popoverPortal]。
- 五框架 UI 只组装 Primitive；每层九个对应场景，共九十份示例，并同步 API、文档、Preview 注册和源码展示。
- 源码语法、导入/公开符号、Vue props 声明、命名、文件长度及场景清单检查通过。未进行类型或运行时验收。
