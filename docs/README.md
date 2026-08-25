# Documentation workspace

文档官网与业务应用分离。当前端到端样板包含 Solid 文档壳、Solid Preview Runtime、Button API JSON 和基础示例。

## 本地开发

一个命令同时启动官网和五个真实框架 Preview Runtime：

```text
corepack pnpm run docs:dev
```

访问 `http://127.0.0.1:4100/solid/components/button`。框架切换使用端口
4110–4114 上五个独立 Preview Runtime。官网显示 `docs/preview/*/src/examples` 中的真实示例源码；不会启动或读取 `apps/*`。

## 增加组件文档

1. 在 `api/<layer>/<component>.json` 描述语义 API、事件和 Demo 索引。
2. 在每个框架的 `preview/<framework>/src/examples/<component>/` 编写原生示例。
3. 将示例注册到该框架 Runtime。注册项只负责 `component + demo -> component` 映射。
4. 文档页通过 API JSON 生成表格和属性控件；不在页面组件里复制 API。

API JSON 记录跨框架公共语义。框架语法差异放到 `bindings`（后续 schema 增加）或框架专属说明，不能复制五份公共描述。

## Preview 协议

宿主通过 `postMessage` 发送 `render` 和序列化后的 props。Runtime 回传：

- `ready`：示例可接收 props。
- `resize`：iframe 内容高度变化。
- `event`：已知事件及可序列化参数。
- `error`：示例渲染错误。

协议不传函数、不执行字符串代码，也不允许 Preview 承担官网导航、Markdown 或 API 表格。
