# Fex Design

Fex Design 是一个跨框架设计系统：共享语义、设计 token 与纯逻辑，同时提供 React、Vue、Solid、Svelte 和 Angular 的原生组件实现与示例。

- 官网：<https://fsj930210.github.io/fex-design/>
- 组件文档：Primitive 负责可组合的原子结构，UI 提供常用的快捷外观与 API。

## 本地开发

```bash
pnpm install
pnpm dev:docs
```

## 构建并预览官网

```bash
pnpm docs:build
pnpm docs:preview
```

`docs:preview` 读取 `docs/site/dist`，并非开发服务器。访问 <http://127.0.0.1:4173/>。

## Docker

Docker 构建使用 Node 22：

```bash
docker build -t fex-design-docs .
docker run --rm -p 8080:80 fex-design-docs
```

访问 <http://127.0.0.1:8080/>。GitHub Actions 使用同一个 Docker 构建流程，并将静态产物发布到 GitHub Pages。
