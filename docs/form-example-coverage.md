# Form 示例覆盖

目标是五框架 Primitive/UI 使用同一套场景、操作与反馈，UI 只提供快捷组合。下表是完整交付范围，不代表所有场景已经实现或通过浏览器验证。

| 场景                | 覆盖内容                                                                         |
| ------------------- | -------------------------------------------------------------------------------- |
| basic               | 初始值、基础校验、提交和重置                                                     |
| layout              | Form 部件组合与响应式布局                                                        |
| validation-feedback | 已重构表单控件的统一校验反馈                                                     |
| schema-validation   | 接入 Zod 等第三方 Schema 校验                                                    |
| submit              | 异步提交、提交状态和失败反馈                                                     |
| events              | 显式字段事件与业务联动                                                           |
| reset               | 修改后恢复初始化值                                                               |
| linked-fields       | 字段依赖、条件字段、动态校验、级联与密码确认                                     |
| nested-array        | 嵌套对象、动态数组的添加、删除和字段校验                                         |
| field-prefix        | shipping/billing 显式路径前缀与复用地址字段组；已实现，见浏览器证据              |
| nested-fields       | 父子两层数组的独立新增、删除、连续移位、空数组重建与重置；已实现，见浏览器证据   |
| complex-dynamic     | 整组复制、稳定 ID、嵌套成员增删、邮箱条件字段与联合 Schema；已实现，见浏览器证据 |
| nested-validation   | 对象/数组字段、分配名称去重、合计预算联合校验及错误归属；已实现，见浏览器证据    |
| dirty-state         | 修改状态、恢复初始值与状态反馈                                                   |
| scroll              | 默认滚动到首个错误、滚动到指定错误字段                                           |
| context-only        | 通过上下文组合表单部件                                                           |
| custom-control      | 在普通示例内实现自定义控件并显式绑定                                             |
| direction           | LTR 与 RTL                                                                       |
| css-variables       | Primitive/UI 的 CSS 变量定制                                                     |
| semantic-styles     | Primitive/UI 的公开语义部件样式定制                                              |

自定义控件只作为普通 Form 场景的一部分，不单独建立 Primitive/UI 目录，也不按框架在当前页面重复展开。

## 已取得的浏览器证据

2026-11-11 正式交互回归：nested-array 十个正式页面新增第二成员、填写无效邮箱后保存，均出现对应逐项邮箱错误；删除第一成员后剩余成员区域和错误路径跟随移位，十页控制台 warning/error 均为空。

2026-11-11 正式交互回归：field-prefix 十个正式页面填写寄送街道后保存，账单路径不被串改；点击复制寄送地址到账单后十页 JSON 均同时得到 shipping/billing 的上海与浦东路1号，控制台 warning/error 均为空。此前已验证复制后继续修改寄送地址不会改到账单路径。

2026-11-11 正式交互回归：linked-fields 十个正式页面先将密码和确认密码填为相同值，再修改密码，确认字段均即时显示“**两次密码需一致且至少 8 个字符**”依赖错误；十页控制台 warning/error 均为空。此前已验证地区切换清空城市、企业账号条件字段及隐藏字段不阻塞提交。

2026-11-11 正式交互回归：dirty-state 十个正式页面执行填入修改值、改回初始值、重置状态三步，状态统一为修改后 `isDirty=true/isDefaultValue=false/isTouched=true`，改回后 `true/true/true`，重置后 `false/true/false`。十页控制台 warning/error 均为空，截图确认状态 JSON 和操作区一致。

2026-11-11 正式交互回归：semantic-styles 十个正式页面提交空标题后均进入定制错误状态，整面板 576×422px，错误背景 computed 为 `rgb(254, 226, 226)`，Primitive/UI 及五框架一致，控制台 warning/error 均为空。此前已验证默认样式与定制样式往返，这次补充正式端口错误状态。

2026-11-11 正式交互回归：css-variables 十个正式页面切换为宽松变量后 computed `--form-gap` 均为 24px、`--form-item-gap` 均为 10px，标签/错误颜色分别为 `#4338ca` / `#be123c`，表单均为 536×264px；空保存显示两项错误，十页控制台 warning/error 均为空，截图确认变量继承到 Form 和错误外观一致。

2026-11-11 正式交互回归：context-only 十个正式页面均确认原生 form 数量为 0；保存空签名显示最小长度错误，填写合法签名后保存状态统一为“已保存 小林 的个人签名”，再点击恢复初始资料恢复空签名。十页控制台 warning/error 均为空，截图确认业务面板、字段上下文和数据区布局一致。

2026-11-11 正式交互回归：direction 十个正式页面空提交后均显示账号和邮箱错误；填写账号后切换为 RTL，错误状态和账号值保留，页面 dir 均为 rtl，按钮文本变为“切换为 LTR”。截图确认横向标签列、说明、错误和操作区完成镜像，十页控制台 warning/error 均为空。

2026-11-11 正式交互回归：custom-control 十个正式页面填写 +86 的 11 位号码后保存，均显示“已保存手机号：+86 13800138000”；切换区号后对象值统一变为 countryCode 为 +852、number 为空，错误提示随规则更新。十页控制台 warning/error 均为空，截图确认对象数据区、错误样式与控件布局正常。

2026-11-11 正式交互回归：错误定位与滚动十个正式页面点击“校验并定位首错”后滚动容器均回到 0；点击“定位备注错误”后均滚动到 686px，截图确认备注字段获得焦点且错误样式可见。十页控制台 warning/error 均为空，Primitive/UI 及五框架滚动结果一致。

2026-11-11 正式交互回归：complex-dynamic 十个正式页面均复制分组、切换复制成员为“不收集邮箱”、保存并显示“已保存 2 个分组，2 位成员”，且控制台 warning/error 均为空。复制后的独立 ID 和删除路径此前已验证，本次补充正式预览链路。

2026-11-11 正式交互回归：nested-validation 十个正式页面将预算保持为 100 后保存，均显示分配合计超预算错误；改为 120 后错误即时清除；把第二项名称改为“设计”后均显示分配名称重复错误。十页控制台 warning/error 均为空，截图核对联合错误状态的嵌套分配区域与字段反馈。

2026-11-11 正式交互回归：正式端口的 Schema-validation 十个页面均完成邮箱、密码、确认密码的显式填写并提交，状态统一显示“注册校验通过：user@example.com”，控制台 warning/error 均为空。此前已覆盖空提交三项错误与确认密码归属；本次补充确认正式文档预览链路的成功提交。

2026-11-11 正式预览：Svelte 4113 的布局示例加载及横向表单空提交正常、控制台无 warning/error。Angular 4110 首次启动实际编译报出其他控件旧示例缺失 invalid 输入、Input/InputNumber 类未闭合、UI Separator 错放 Select 实现且缺模板；按报错修复对应声明/模板与关联属性后，正式 4110 可加载布局并显示校验错误。继续逐一加载十九个重写场景的 Primitive/UI 共三十八页，均显示对应场景且控制台 warning/error 为空。原进程仍监听 4110；终端工具会话句柄已失效，未因句柄失效重启存活服务，也未把修复后的完整终端输出当作已取得证据。

2026-11-11 文档实页核对：发现 MdxDocument 在合并两层场景后再次应用通用排序，导致 Form manifest 的 layout 首位及业务顺序失效，且标题被通用规则覆盖。Form 改为保留声明顺序，浏览器核对五框架文档页均为相同二十项顺序、layout 首位，无自定义控件的跨框架子目录。React 的 complex-dynamic 源码卡片展示新的真实实现且保留 @fex-design/react/ui/* 公开导入。另发现使用方式五框架都展示 React 片段，新增所属框架实例创建和显式绑定的 Primitive/UI 片段，浏览器切换五页两层逐一确认。文档宿主页控制台无 warning/error；该证据不包含尚未进入可视区域的懒加载 iframe，不能证明 Angular/Svelte 正式预览入口已经正常。

2026-11-11 静态核对：共享 manifest 的二十个场景在五框架 Primitive/UI 中均有对应文件，各目录无额外场景文件；未把数量一致当成交互一致证据。Form 相关 331 份源码/示例文件扫描未发现超过 300 行（排除空行/纯注释）的文件或禁止的品牌组件前缀。React Primitive 公开入口仍残留旧隐式绑定 FieldBindingOptions/ValuePort 类型转出，其余四框架无此转出，且框架源码无消费；已移除此无对应组件能力的公开转出。core 中历史绑定工具的进一步清理不纳入本次示例验证结论。

2026-11-11 回归：reset 十个页面逐一回填陈晨/chen@example.com、仅重置姓名为林晓且邮箱保留、手动修改两字段后整表重置为林晓/lin@example.com。最终整表 536×300px，字段、标签、输入、按钮和数据区坐标/尺寸及字体、行高、边框宽十份一致，十页控制台 warning/error 均为空。

2026-11-11 回归：validation-feedback 十个页面初始、十项错误、全部修正成功三态的整表和字段位置一致，宽 632px，高分别 1237/1497/1301px。十页空提交都聚焦活动名称并滚到页面顶部；Switch 均为 44×24px、aria-invalid=true、1px 内描边。逐项输入标题/邮箱/人数、选择场地/单选、开启 Switch/Checkbox、日期面板选择 2026-11-20、输入时间 09:30:00、滑块连续三次 ArrowRight 写入 30，十页均提交成功。设置邮箱业务错误后修改可清除，再提交成功；清空重试恢复全部十字段初始值并清除全部错误。最终十页无控制台 warning/error。本次补齐 Angular Primitive 滑块修复后的完整成功流程，尚未覆盖所有视口和主题。

2026-11-11：核对 Primitive 实际公开入口、FormField 与 FormControl 实现后，移除 API JSON 中过时的 errorVisibility、valuePropName、trigger、getValueFromEvent、getValueProps、target 和 FormItem 文档；修正 FormField 的容器说明及 FormControl 的显式绑定职责。UI 补充默认首错滚动配置并明确渲染参数绑定。两层 API 的二十项 demos 已按共享 manifest 同步顺序、标题、说明和高度，layout 位于第一项。该清理不代表 API 全量审核已经完成。

2026-11-11：complex-dynamic 新增五框架 Primitive/UI 十份场景。十页验证复制分组和成员生成独立 ID、编辑复制项、无效邮箱报错、隐藏邮箱解除校验并提交、重新显示恢复校验、删除首组后复制项姓名保留、修正邮箱后提交成功、重置恢复初始数据。十页控制台 warning/error 均为空。重置后整表 536×852px，各字段、按钮、数据区相对位置及尺寸十份一致。Angular 取数组项可能为空的类型错误已修正，任务专用预览增量编译成功；Svelte 预览会话无新增编译错误。此项不替代全场景回归与全部视口视觉检查。

2026-11-11：nested-validation 新增五框架 Primitive/UI 十份场景，Zod 对象 Schema 负责嵌套项目/分配数组字段及联合约束。十个页面验证合计超预算错误归属第二项金额、修改预算即时清除、重复名称归属重复项、修改另一项名称清除重复、非法金额和空项目名显示对应字段错误、修正后提交成功。十个页面无控制台 warning/error。正常态整表高 1008px、联合错误态高 1034px；整表宽、各区域和六字段坐标/尺寸十份一致。

2026-11-11：nested-fields 新增五框架 Primitive/UI 十份场景。十个页面验证：新建第二分组及两名成员、末位成员错误校验、删除首分组保留后组值与错误、再删除首成员保留后成员值与错误、修正提交成功。继续删空成员/分组并提交、从空数组新建后保存、重置恢复初始 id/值。最终十份整表均 536×788px，外层组区 400px、操作区 y=416px、数据区 y=464px，三字段尺寸和位置一致。Angular 嵌套 track 作用域编译错误修正后增量编译成功；修复后操作无新增控制台 warning/error。

2026-11-11：field-prefix 新增五框架 Primitive/UI 十份场景，复用 AddressFields 并显式组成 shipping/billing 字段路径。十个页面验证只填写寄送街道后账单独立报错、复制寄送地址到账单、复制后继续修改寄送而账单值不变、保存成功、重置恢复不同初始城市。十个页面控制台无 warning/error。发现 Angular UI FormGroup 标题遗漏默认 legend 样式，修复后十份整表均 536×752px，地址组高 224px，标题 14px/600、下间距 8px，按钮和数据区位置一致。

2026-11-11：semantic-styles 十份场景验证公开语义部件。浏览器发现并修复 Solid UI 字段容器及默认错误的样式透传、Svelte UI 各部件 styles/默认错误 class、Angular UI 标签/说明/错误 style 透传。修复后十个页面的定制错误状态均为 536×222px，根/字段内边距、部件位置、边框色、文字色、错误背景等 computed style 一致；切默认样式高度均 158px，重新应用恢复全部样式，修正标题后提交成功，无控制台 warning/error。

2026-11-11：css-variables 新增五框架 Primitive/UI 十份场景并登记目录/API。十个页面空提交后切换 compact/spacious：computed form gap 为 12/24px，field gap 为 4/10px，标签/说明/错误颜色分别与配置的三种色值一致。相同错误状态下整表尺寸为 536×264px / 536×324px，各行和按钮相对位置十份一致。切换后填写两字段提交成功，十个页面无控制台 warning/error；UI API 补齐五个共享变量说明。

2026-11-11：direction 新增五框架 Primitive/UI 十份场景，使用原生 dir 与内置 horizontal 布局。十个页面验证空提交两项错误、填写账号、带着邮箱错误切到 RTL、修正邮箱后提交成功。成功状态在同一数据下往返 LTR/RTL，十份表单高度均 180px；逐项比较标签、控件、说明及操作按钮的左右坐标，均精确镜像且 y/尺寸保持相同。十个页面控制台无 warning/error。页面首次加载曾出现浏览器导航观察超时，继续检查原标签页均正常加载，没有重启服务。

2026-11-11：custom-control 新增五框架 Primitive/UI 十份普通场景，私有 PhoneControl 组合本层 Button/Input，返回 countryCode/number 对象并显式绑定。十个页面验证空提交错误且聚焦 phone 输入、+86 的 11 位号码提交、切换 +852 清空号码、8 位号码提交、重置恢复 +86/空号码；十个页面无控制台 warning/error。重置后的表单均 536×292px、gap=16px，字段、按钮区和数据区位置一致。自定义控件未建立独立目录或跨框架导航分类。

2026-11-11：context-only 新增五框架 Primitive/UI 十份实现。React/Vue/Solid/Svelte 使用 component=false，Angular 使用 div 上下文宿主及 contents 布局。十个页面原生 form 数量均为 0，逐一验证空签名校验失败、修改昵称及合法签名后保存、恢复初始资料。恢复后整面板均 576×542px，编辑区高 218px、按钮区高 32px、数据区高 104px，各区相对位置相同；十个页面控制台无 warning/error。

2026-11-11：scroll 十份实现完成浏览器验证。未显式传 scrollToFirstError，先定位末尾后提交，十个页面均滚回 0px 并聚焦 contact；填写联系人再提交均聚焦 email；定位备注均聚焦 notes 且 aria-invalid=true，最终滚动值均 660px。最终整张表单均 536×368px、gap=16px，滚动内容高度 978px，各行高度和相对位置一致；十个新标签页控制台无 warning/error。Angular 预览增量编译成功，Svelte 预览会话无新增编译错误。React 修复滚动注册的陈旧 invalid 闭包，Vue UI 修复重复提交处理及布尔 prop 缺省导致的宿主/滚动默认值差异。其余场景仍需验证默认首错定位改动后的回归。

2026-11-10：nested-array 新增五框架 Primitive/UI 十份实现，包含 team.name 嵌套对象、成员 id、数组路径、新增、删除和逐项校验。十个页面完成：新增第二成员、输入姓名/无效邮箱、提交显示第二行错误、删除第一行、确认剩余成员 id 与值不变、修正邮箱并提交成功。Vue/Solid/Svelte 发现路径变化仍绑定旧 FieldApi，已在 Primitive 路径边界按框架原生 keyed 生命周期重建字段；Angular 在 keyed 路径指令渲染后执行一次数组校验，修复移位后的错误丢失。最终十份成员字段宽 502px、高 58px，团队字段宽 536px、高 58px；修复后检查无新增控制台 warning/error，Angular 增量编译成功。连续输入焦点已检查八个非 Angular 页面；空数组、多次重排及完整视觉验收仍待补充。

2026-11-10：linked-fields 新增五框架 Primitive/UI 十份实现并登记目录/API/Angular loader。十个页面逐一验证：华东选上海后改华南，城市清空且选项变广州/深圳；企业账号显示公司并校验必填；密码与确认一致后再修改密码，onChangeListenTo 立即产生确认错误；修正后企业账号提交成功；公司字段已有错误时切回个人，隐藏字段不阻止提交。最终个人状态五字段尺寸十份一致（宽 536px，账号类型高 50px，其余高 58px）。修复 Angular 依赖字段数组类型与 Select 输出事件名后增量编译成功；修复后操作期间十页面无新增控制台 warning/error。完整失败态及所有视口视觉验收尚未完成。

2026-11-10：dirty-state 新增五框架 Primitive/UI 十份实现并登记 manifest/API/Angular loader。浏览器逐一验证：填入修改值后 dirty=true/default=false/touched=true；改回初始值后 dirty=true/default=true/touched=true；reset 后 dirty=false/default=true/touched=false。十份字段均为 536×58px。八个非 React 页面无控制台 warning/error；React 发现预览入口热更新重复 createRoot，增加 dispose 卸载后，在新标签页实际触发入口热更新，页面正常重挂载且无控制台 warning/error。Angular 预览增量编译成功。

2026-11-10：events 十份实现统一为通知渠道与收件地址，使用所属层的 Radio、Input 和 Button。浏览器逐一执行邮件回填、切换短信并清空、短信回填、手动输入与 Tab 失焦，数据和反馈一致。十份字段宽度均 536px，渠道字段高 50px，地址字段高 58px。修复 Solid Primitive 示例的 JSX 语法错误后交互通过；Svelte core-store 适配补读订阅时最新快照后，两层 radiogroup 均具有“通知渠道”可访问名称。最终操作没有新增控制台 warning/error，旧 Solid 编译失败记录保留在该标签页日志中。

2026-11-10：schema-validation 已统一为 Zod 对象 Schema 注册场景，五框架 Primitive/UI 十个页面逐一验证：空提交显示三项错误；密码不一致仅归属确认密码；修正后提交显示注册成功。成功状态三字段的宽度均为 536px、高度均为 58px，内部输入尺寸与偏移一致。Angular 预览新增直接 Zod 依赖后增量编译成功；修复后操作期间十个页面无新增控制台 warning/error。此证据不覆盖全部主题、视口及失败状态的完整视觉验收。

2026-11-10：新增 Angular Primitive/UI reset 示例，两个页面均逐一执行回填资料、仅重置姓名、重置全部。回填为陈晨/chen@example.com，单字段重置为林晓/chen@example.com，整表重置为林晓/lin@example.com。预览增量编译成功，两个页面未捕获控制台 warning/error；其余框架 reset 的完整视觉和交互对照仍待统一验收。

2026-11-10：submit 在 React、Vue、Solid、Svelte、Angular 的 Primitive/UI 十个页面逐一执行了占用邮箱提交、异步等待、业务错误、修改邮箱和成功重试。等待期间输入框禁用，最终提交尝试为 2 次，显示成功回执；十个页面未捕获控制台 warning/error。本项证明提交交互链路，不等同于完整视觉一致性验收。Angular 使用独立 Form 预览入口，不能据此证明完整 Angular Preview 无编译错误。

2026-11-11：重写 Form UI/Primitive API 文档。示例目录现在由 basic 开始，随后按布局、校验、提交、状态、联动、嵌套、滚动、上下文和样式能力排列；根组件属性并入各自的 UI/Primitive 主 API 表，不再把 UI Form 或 Primitive FormRoot 重复渲染成子组件卡片；子组件区域只列出 FormField、FormGroup、FormSubscribe，以及 Primitive 的字段和语义部件。两层均补齐显式绑定职责、classNames/styles（UI）或部件 class/style（Primitive），并在 Form API 下提供唯一一份 handleSubmit、reset、resetField、setFieldValue、getFieldValue、pushFieldValue、removeFieldValue、validate、setFieldMeta 等高频 instance API 表，完整 TanStack Form 文档可直接点击打开。API 类型按当前文档框架解析：React 显示 ReactNode/CSSProperties，Vue 显示 VNodeChild/StyleValue，Solid 显示 JSX.Element/JSX.CSSProperties，Svelte 显示 Snippet，Angular 显示 TemplateRef/string；React 正式文档页面已检查，根组件不再重复，instance 只出现一份，未再出现 FrameworkNode 占位符。

尚待完成：其余场景的正式端口深度交互回归和最终终端检查。当前 manifest 已列出二十个场景，已验证的部分不能作为完整目标的交付证据。4110–4114 正式服务当前有监听；独立 4125/4126 任务预览会话已结束，不能以此替代正式端口证据。
