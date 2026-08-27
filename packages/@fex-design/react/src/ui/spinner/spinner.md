# React UI Spinner

Recommended Spinner components for standalone loading indicators and content loading states. This entry exposes `Spinner` and `SpinnerContainer`.

## Import

    import { Spinner, SpinnerContainer } from '@fex-design/react/ui/spinner'

## Components

| Component | Purpose |
| --- | --- |
| Spinner | Standalone loading indicator. |
| SpinnerContainer | Keeps content mounted and displays a local loading overlay. |

## Examples

Examples are stored in `examples/<name>` as the source for the documentation preview.

| Name | Covers |
| --- | --- |
| basic | Built-in standalone LoadingIcon. |
| sizes | Small, medium, and large indicators. |
| custom-indicator | Replacing the built-in indicator. |
| container | Content loading with a local overlay. |
| text | Loading description text and stacked layout. |
| styling | Semantic class customization. |

## Spinner API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Indicator size. |
| children | `ReactNode` | `LoadingIcon` | Custom indicator content. |
| native attributes | `ComponentProps<'span'>` | — | Native span attributes and events. |

## SpinnerContainer API

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| spinning | `boolean \| undefined` | — | `undefined` renders a standalone Spinner; `false` renders children without an overlay; `true` renders children with an overlay. |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Overlay indicator size. |
| text | `ReactNode` | — | Optional loading description. |
| indicator | `ReactNode` | `LoadingIcon` | Custom overlay indicator. |
| classNames | `SpinnerClassNames` | — | Semantic class overrides. |
| styles | `SpinnerStyles<CSSProperties>` | — | Semantic inline style overrides. |
| children | `ReactNode` | — | Content kept inside the container. |
| native attributes | `ComponentProps<'div'>` | — | Native div attributes and events. |

## Loading states

    <SpinnerContainer spinning={loading} text="加载中...">
      <DataTable />
    </SpinnerContainer>

The container keeps its children mounted. When `spinning` is true, it adds a local overlay above the content. When false, only the content is visible. When undefined, it acts as a standalone Spinner shortcut.

## Custom indicator

    <SpinnerContainer spinning indicator={<CustomLoadingIcon />}>
      <DataTable />
    </SpinnerContainer>

For a standalone indicator, pass custom content as Spinner children:

    <Spinner><CustomLoadingIcon /></Spinner>

## Text layout

The overlay is horizontally centered by default. When `text` is provided, the UI adds `flex-col` so the indicator and text are stacked. This is a default class choice, not a public layout prop, and can be overridden with semantic classes.

## Semantic styling

    <SpinnerContainer
      spinning
      classNames={{ overlay: 'bg-primary/10', spinner: 'text-primary', text: 'text-primary' }}
    >
      <Content />
    </SpinnerContainer>

Available parts are `root`, `spinner`, `overlay`, `indicator`, and `text`.
