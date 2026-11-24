# Dropdown Primitive 设计

## 目标与范围

Dropdown 提供由触发元素打开的操作菜单，五框架具有一致的状态、交互、语义和替换能力，并遵循各自框架的原生 API。Primitive 带默认样式，允许替换触发元素、浮层内容和菜单项，也允许脱离内置部件使用逻辑层。

本设计只覆盖 Primitive。暂不设计 UI 的数据驱动 API，也不提供 items、业务请求、路由或按钮文案。右键触发由 ContextMenu 处理；任意表单或交互面板使用 Popover，不作为 Dropdown 菜单内容。

## 决策：组合现有能力，新增协调层

| 能力                                           | 归属            | 现状和处理                                                                               |
| ---------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------- |
| 根浮层开关、定位、容器、挂载、外部点击、Escape | Popover         | 复用一个 Popover controller，Dropdown 不另存 open。                                      |
| 菜单项注册、禁用、导航、类型搜索、子菜单       | Menu            | 复用一个 Menu controller 和 DOM binding；子菜单继续由 Menu 管理及定位，不再套 Dropdown。 |
| 根菜单打开时的焦点、成功激活后的根浮层关闭     | Dropdown 协调层 | 新增跨框架 core 逻辑和框架适配；不依赖 role 查询或 DOM click 冒泡。                      |
| 菜单项、分组、分隔线、子菜单                   | Menu Primitive  | 直接组合 Menu 现有公开部件，不复制成 DropdownItem 等第二套部件。                         |

Popover 原有的默认焦点逻辑只自动处理 dialog，Menu 键盘处理从已注册菜单项开始；因此只拼接现有部件不能完成从触发器进入菜单的焦点链路。Popover 增加可取消的打开自动聚焦回调，保留原有默认行为，由 Dropdown 在内容就绪时调用 Menu 的公开聚焦能力。Menu 的 `onActivate` 在值更新和子菜单关闭前调用，可被取消；它是激活前回调，不能直接用作成功激活通知。Menu 另外提供成功激活通知和按层级聚焦已注册菜单项的能力；这些能力属于 Menu，而不是复制键盘或注册逻辑。

## 组合与公开入口

```text
DropdownRoot
├─ DropdownTrigger                 绑定调用方触发元素
└─ DropdownPortal                  可选，默认挂载到 ownerDocument.body
   └─ DropdownContent              同一个 DOM 节点承担浮层和根 MenuContent
      ├─ MenuItem
      ├─ MenuGroup / MenuGroupLabel / MenuSeparator
      └─ SubMenu
         ├─ SubMenuTrigger
         └─ SubMenuContent
            └─ MenuItem
```

`DropdownRoot` 创建并协调一个 Popover 和一个 Menu 实例，提供两者所需上下文；它不额外维护开关或菜单选中状态。`DropdownContent` 将浮层定位绑定与 Menu 的根内容绑定合并到同一真实元素，只有这一元素拥有 `role="menu"`，不再嵌套一个额外 `MenuContent`。默认使用垂直布局，支持 `dir`、`size`、禁用、子菜单触发方式和延迟等适用于下拉菜单的 Menu 配置。根级无 `MenuRoot`/`MenuContent` 的重复包装。子菜单直接使用 Menu 原有部件和状态，支持多级。

Dropdown 入口显式导出 `DropdownRoot`、`DropdownTrigger`、`DropdownPortal`、`DropdownContent` 和本框架独立逻辑适配器；Menu 部件仍从对应 Menu 入口导入，避免复制公开 API。每个部件有独立实现文件；Angular 使用符合宿主元素的无品牌 selector。Portal、Trigger 和 Content 的 DOM 绑定、原生属性、事件、class、style 和 ref/元素引用按框架原生方式合并，调用方事件不得被内部事件覆盖。

设计示意，实际语法按各框架表达：

```tsx
<DropdownRoot onOpenChange={handleOpenChange} onActivate={handleActivate}>
  <DropdownTrigger>{(props) => <button {...props}>操作</button>}</DropdownTrigger>
  <DropdownPortal>
    <DropdownContent>
      <MenuItem value="rename">重命名</MenuItem>
      <SubMenu value="share">
        <SubMenuTrigger>分享</SubMenuTrigger>
        <SubMenuContent>
          <MenuItem value="copy-link">复制链接</MenuItem>
        </SubMenuContent>
      </SubMenu>
    </DropdownContent>
  </DropdownPortal>
</DropdownRoot>
```

上面只表达结构，不将 React 的 render prop 强加给其他框架。Vue 使用 slot、Solid 使用原生响应式绑定、Svelte 使用 snippet/action、Angular 使用指令与内容投影；具体类型和生命周期在实现前依据各框架当前官方文档及成熟组件库源码确定。

## 状态与公开配置

- Root 提供 `open`、`defaultOpen`、`onOpenChange` 的框架原生等价 API。根级 `disabled` 同时配置浮层触发与菜单交互；方向、尺寸和子菜单策略由 Menu 配置，定位、容器、挂载和 dismiss 由 Popover 配置。受控时动作只请求变更，实际开关以调用方传入值为准；非受控状态仅由 Popover 保存。配置同步不伪造用户变更事件。
- 其余适用配置分别通过 `menuProps` 和 `popoverProps` 传入；根部件负责开关、禁用和激活等常用 API。Menu 的 `layout` 固定为 `vertical`，`inlineAccordion` 固定为 `false`，即使运行时传入被类型排除的值也不会改变这些约束。触发器与内容的关联 ID 由组件内部生成。
- 菜单选择状态仍由 Menu 管理；需要受控选择时直接映射 Menu 的 `value`、`defaultValue`、`multiple` 和变更回调。Dropdown 不以关闭动作重置用户选择。Menu 的 `openValues` 仅表示子菜单，不能与 Dropdown 根 open 混用。
- 默认点击触发；允许复用 Popover 的 hover/focus 触发配置时，同样必须遵循下述焦点规则。context-menu 触发不属于此组件。禁用时不响应打开请求；受控外部更新仍按 Popover 契约处理。
- Root 接受可取消的 `onActivate`，透传 Menu 的 value、原因及原事件；`preventDefault()` 取消 Menu 的选中更新和 Dropdown 的默认关闭。对成功激活默认关闭根菜单，可提供 `closeOnSelect`（默认 true）；关闭不等同于取消激活。调用方的菜单回调与内部协调均须保留，不能互相覆盖。

## 交互和焦点

| 动作                             | 行为                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 点击、Enter、Space 打开          | 打开后聚焦根菜单第一个可用项；空菜单聚焦 Content，保证焦点有明确落点。                                  |
| ArrowDown / ArrowUp 打开         | 分别聚焦根菜单第一个 / 最后一个可用项；阻止对应按键的默认滚动。                                         |
| hover / focus 打开               | 不主动抢焦点；触发器上的方向键进入已打开菜单。                                                          |
| 菜单内方向键、Home/End、字符搜索 | 由 Menu 的注册项和键盘逻辑处理，跳过不可用项；左右方向遵循 dir。                                        |
| 打开或关闭子菜单                 | 由 Menu 管理层级及焦点；子菜单 Escape 先关闭当前层并返回其触发项。                                      |
| 成功激活叶子项                   | 先执行可取消的激活回调和 Menu 状态更新，再按 `closeOnSelect` 请求关闭根浮层；不能通过 role 字符串推断。 |
| Escape 关闭根菜单                | 仅最上层处理；关闭后焦点返回触发器。                                                                    |
| 点击外部                         | 请求关闭，保留用户点击目标的焦点，不强制拉回触发器。                                                    |
| Tab / Shift+Tab                  | 允许浏览器正常移动焦点，离开菜单后关闭根菜单，不阻断或强制恢复焦点。                                    |

焦点请求只在打开已实际生效、Content 已挂载且目标可见时执行；受控打开被拒绝、关闭、卸载或新的请求覆盖时取消待处理请求。内容延迟挂载和 Portal 均须可用；不依靠固定 timeout 猜测渲染完成。所有项不可用时使用 Content 落点。处理输入时先调用用户事件，已阻止默认行为则不执行内部默认动作。

## 语义、样式与可替换性

Trigger 连接真实元素，提供 `aria-haspopup="menu"`、`aria-expanded`、根禁用时的 `aria-disabled` 和指向 Content 的 `aria-controls`。Content 是唯一的根 `role="menu"`，具备由 Trigger 或调用方提供的可访问名称。Menu 负责菜单项与子菜单的角色、禁用和展开关系。Portal 中的嵌套内容属于同一交互树，外部点击与 Escape 只由最上层响应。

Content 复用共享 Popover/Menu 样式能力并提供默认外观；Menu 部件继续使用自身默认样式。各部件保留原生 class/style、属性和事件；提供稳定的 `data-slot` 和状态属性，样式定制不要求修改组件内部 DOM。Dropdown 没有自有 CSS 变量，示例可以演示被复用部件的变量，但不将其列为 Dropdown 专属变量。避免在 Dropdown 内复制 Menu 的样式状态或将整个组件状态放入宽 Context。

独立逻辑入口创建同样的 Popover、Menu 和协调层，提供状态快照、开关请求、Trigger/Content 绑定及清理能力，允许消费者自行渲染所有 DOM；内置部件也是该逻辑的消费者。所有绑定应可合并用户引用和事件，卸载时清理订阅、DOM 注册、焦点请求与浮层资源。自定义菜单项通过 Menu 的公开注册能力参与导航和激活，而不是靠 DOM 角色选择器猜测。

## 实现顺序与验收

1. 在 Menu core 补充可复用的按层级首尾聚焦和成功激活通知，明确通知发生在可取消回调和状态更新之后；保持现有 Menu 调用方语义。检查既有 overlay 栈对嵌套 Menu Portal 的边界，再以实际能力接入，不复制 dismiss 系统。
2. 新建 Dropdown core 协调器，组合 Popover 与 Menu，处理焦点请求、成功激活和关闭原因；逐框架提供独立适配器及三个部件、Portal。删除旧 Dropdown 的重复实现和入口后建立显式导出，不保留旧实现的兼容分支。
3. 五框架使用相同场景验证：受控及非受控、禁用、方向键和焦点返回、多级子菜单、取消激活、保持打开、Portal 和自定义容器、外部点击、Tab、动态及空菜单、自定义触发器与内容、原生事件与样式透传、独立逻辑。逐项比较行为和默认样式，不以源码相似或示例数量相同代替验证。
4. 最后补齐 Primitive API 文档与框架示例，展示真实运行的组合源码；对本次修改文件检查品牌前缀及公开入口。实际验证方式遵循项目与用户当时的指令。

文档站注册器支持仅提供单层 API；Dropdown 当前仅注册 Primitive，五框架示例位于各组件包的 Primitive examples 目录。

本文件是目标设计。五框架实现和示例已按此设计编写；跨 Portal 的事件、焦点边界和五框架运行行为仍需在允许的验证条件下逐项确认，不应以源码相似代替行为验证。

已知实现缺口：受控方向键打开请求若经历未接受该请求的配置同步，随后才由外部设为打开，原始按键关联可能丢失，ArrowUp 可能聚焦首项。现有布尔受控 API 无法区分这种延后接受和拒绝后独立打开；目标契约仍要求正确处理请求及其取消。
