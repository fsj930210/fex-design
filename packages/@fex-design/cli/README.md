# Fex CLI (`fex`)

Fex CLI 是类似 shadcn 的多框架源码交付工具，为 **React、Vue、Solid、Svelte、Angular** 5 大框架提供纯粹、开箱即用的源码直接交付。

组件不作为私有 npm 包发布，而是通过 CLI 直接将源码复制并自愈进用户工程。交付代码具有以下核心特性：
- **纯粹内联（Pure Inlined Tailwind）**：静态类名直接拍入 JSX/模板，CVA 保持私有内聚，全量享受原生 Tailwind 编辑器自动补全。
- **零 Core 泄露（Zero-Core Architecture）**：单组件逻辑自治于同级 `utils.ts`，跨组件共享算法沉淀到 `utils/shared/`，用户工程坚决消灭 `core/` 目录。
- **三层级支持（Primitive / UI / Pro）**：自由选择纯原语、场景化标准 UI 或高级企业级 Pro 复合组件。
- **全自动级联（Cascading Resolution）**：自动提取并写入依赖的 Hooks、图标与共享状态基建，自动检测并安装社区 npm 依赖（如 `@floating-ui/dom`）。
- **Monorepo 零配置寻址（Zero-tsconfig Monorepo）**：不依赖 `tsconfig.json` paths，通过工作区 `package.json` 自动解析物理落盘路径并生成精准包名引用。

---

## 一、 快速使用

### 1. 创建新工程（fex create）
```bash
# 创建标准 SPA 工程（自动集成 Vite + Tailwind CSS v4 + 预装基础组件）
pnpm fex create my-app

# 创建 Monorepo 多包工程（自动划分 packages/ui、packages/hooks、packages/utils 及 apps/web）
pnpm fex create my-monorepo -t monorepo

# 指定框架及预置组件集合（--preset: base 默认 | full 全量 | none 空白）
pnpm fex create my-app -f react --preset full
```

### 2. 初始化已有项目（fex init）
```bash
# 在当前工程目录下初始化（生成 components.json，注入主题变量与基础工具函数）
pnpm fex init

# 在 Monorepo 根目录下为子工程初始化
pnpm fex init -p apps/demo-app
```

### 3. 添加组件
```bash
# 默认添加 UI 组件（自动级联原语、Hooks、图标与共享工具）
pnpm fex add button card popover

# 交互式选择（不传组件名，终端弹出模糊搜索与勾选菜单）
pnpm fex add

# 一键安装目标框架的所有组件
pnpm fex add --all

# 显式指定安装层级（前缀方式，支持单条命令混搭）
pnpm fex add primitive/button          # 仅安装无外观基础部件
pnpm fex add ui/card primitive/button  # 混搭安装
pnpm fex add pro/dialog                # 安装高级 Pro 组件

# 显式指定参数层级
pnpm fex add button -l primitive
pnpm fex add dialog -l pro

# 覆盖已有本地文件
pnpm fex add button -o
```

### 4. 比对本地代码与官方 Registry（`diff`）
在源码交付模式下，用于检查本地源码与官方最新版本的改动：
```bash
pnpm fex diff popover
pnpm fex diff button -p apps/demo-app
```

### 5. 查看与预览
```bash
# 列出当前技术栈的所有 Pro / UI / Primitive 组件
pnpm fex list

# 在终端预览某组件经过样式内联与别名替换后的最终源码（不写盘）
pnpm fex view popover
```

---

## 二、 配置文件 `components.json`

完全兼容 shadcn 习惯的扁平 `aliases` 格式：

### 1. SPA 单体应用配置示例
```json
{
  "$schema": "./node_modules/@fex-design/cli/schema.json",
  "framework": "react",
  "tailwind": {
    "version": "v4",
    "css": "src/index.css",
    "baseColor": "neutral"
  },
  "aliases": {
    "components": "@/components",
    "ui": "@/components/ui",
    "primitive": "@/components/primitive",
    "pro": "@/components/pro",
    "hooks": "@/hooks",
    "utils": "@/lib/utils",
    "icons": "@/components/icons"
  }
}
```

### 2. Monorepo 跨包架构配置示例
如果组件、Hooks、Utils 分别在不同的工作区包中：
```json
{
  "$schema": "../../node_modules/@fex-design/cli/schema.json",
  "framework": "react",
  "tailwind": {
    "version": "v4",
    "css": "src/index.css"
  },
  "aliases": {
    "components": "@rap/components-ui/components",
    "ui": "@rap/components-ui/components/ui",
    "primitive": "@rap/components-ui/components/primitive",
    "pro": "@rap/components-ui/components/pro",
    "hooks": "@rap/hooks",
    "utils": "@rap/utils",
    "icons": "@rap/components-ui/components/icons"
  }
}
```
**寻址原理**：CLI 向上寻找工作区 `pnpm-workspace.yaml`，通过包名（如 `@rap/hooks`）自动定位到对应包目录的 `src`，无需在 `tsconfig.json` 中配置任何别名！

---

## 三、 分层体系（Layer）

| 层级 | 路径 / 参数 | 适用场景 | 级联动作 |
| :--- | :--- | :--- | :--- |
| **`primitive`** | `primitive/xxx`<br/>`-l primitive` | 自研视觉体系、仅复用无障碍交互与状态机 | 级联安装 `hooks` + `utils/shared`，不写入 `ui/` 目录 |
| **`ui`** (默认) | `ui/xxx` 或 `xxx`<br/>`-l ui` | 标准业务开发，开箱即用，高保真 Tailwind 视觉 | 级联安装 `primitive` + `hooks` + `icons` + `utils/shared` |
| **`pro`** | `pro/xxx`<br/>`-l pro` | 复杂业务模板、高阶复合控件（如 ProDialog、ProTable） | 级联安装 `ui` + `primitive` + `hooks` + `icons` + `utils/shared` |

---

## 四、 目录结构设计理念

当添加复杂交互组件（如 `popover`）后，用户工程的落盘组织：

```text
src/
├── hooks/                           # 框架级通用 Hooks（自动级联）
│   ├── use-composed-ref.ts
│   ├── use-core-store.ts
│   └── use-memoized-fn.ts
├── lib/
│   ├── utils.ts                     # cn() + shallowEqualObject()
│   └── utils/shared/                # 跨组件共享的无状态底层算法（原 Core store/floating/overlay）
│       ├── store/create-store.ts
│       └── overlay/create-floating-overlay.ts
└── components/
    ├── primitive/popover/
    │   ├── popover.tsx
    │   ├── use-popover.ts           # 引用 @/hooks/* 和 @/lib/utils/*
    │   └── utils.ts                 # Popover 专属状态机、无障碍与类型（完全自治）
    └── ui/popover/
        └── popover.tsx              # 业务高层封装，内联 Tailwind 样式
```
