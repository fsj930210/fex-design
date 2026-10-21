import { createLazyRouteElement } from '../lazy'
import { ListboxPage } from '../../pages/Listbox'

export const componentRoutes = [
  {
    path: '/bubble',
    element: createLazyRouteElement(() => import('../../pages/Bubble'), 'BubblePage'),
  },
  {
    path: '/auto-complete',
    element: createLazyRouteElement(() => import('../../pages/AutoComplete'), 'AutoCompletePage'),
  },
  {
    path: '/carousel',
    element: createLazyRouteElement(() => import('../../pages/Carousel'), 'CarouselPage'),
  },
  {
    path: '/cascader',
    element: createLazyRouteElement(() => import('../../pages/Cascader'), 'CascaderPage'),
  },
  {
    path: '/data-table',
    element: createLazyRouteElement(() => import('../../pages/DataTable'), 'DataTablePage'),
  },
  {
    path: '/context-menu',
    element: createLazyRouteElement(() => import('../../pages/ContextMenu'), 'ContextMenuPage'),
  },
  {
    path: '/tree',
    element: createLazyRouteElement(() => import('../../pages/Tree'), 'TreePage'),
  },
  {
    path: '/tree-select',
    element: createLazyRouteElement(() => import('../../pages/TreeSelect'), 'TreeSelectPage'),
  },
  {
    path: '/tour',
    element: createLazyRouteElement(() => import('../../pages/Tour'), 'TourPage'),
  },
  {
    path: '/transfer',
    element: createLazyRouteElement(() => import('../../pages/Transfer'), 'TransferPage'),
  },
  {
    path: '/upload',
    element: createLazyRouteElement(() => import('../../pages/Upload'), 'UploadPage'),
  },
  {
    path: '/watermark',
    element: createLazyRouteElement(() => import('../../pages/Watermark'), 'WatermarkPage'),
  },
  {
    path: '/breadcrumb',
    element: createLazyRouteElement(() => import('../../pages/Breadcrumb'), 'BreadcrumbPage'),
  },
  {
    path: '/collapse',
    element: createLazyRouteElement(() => import('../../pages/Collapse'), 'CollapsePage'),
  },
  {
    path: '/color-picker',
    element: createLazyRouteElement(() => import('../../pages/ColorPicker'), 'ColorPickerPage'),
  },
  {
    path: '/dialog',
    element: createLazyRouteElement(() => import('../../pages/Dialog'), 'DialogPage'),
  },
  {
    path: '/drawer',
    element: createLazyRouteElement(() => import('../../pages/Drawer'), 'DrawerPage'),
  },
  {
    path: '/dropdown',
    element: createLazyRouteElement(() => import('../../pages/Dropdown'), 'DropdownPage'),
  },

  {
    path: '/i18n',
    element: createLazyRouteElement(() => import('../../pages/I18n'), 'I18nPage'),
  },
  {
    path: '/input-otp',
    element: createLazyRouteElement(() => import('../../pages/InputOTP'), 'InputOTPPage'),
  },
  {
    path: '/form',
    element: createLazyRouteElement(() => import('../../pages/Form'), 'FormPage'),
  },
  {
    path: '/listbox',
    element: <ListboxPage />,
  },
  {
    path: '/masonry',
    element: createLazyRouteElement(() => import('../../pages/Masonry'), 'MasonryPage'),
  },
  {
    path: '/message',
    element: createLazyRouteElement(() => import('../../pages/Message'), 'MessagePage'),
  },
  {
    path: '/mentions',
    element: createLazyRouteElement(() => import('../../pages/Mentions'), 'MentionsPage'),
  },
  {
    path: '/qrcode',
    element: createLazyRouteElement(() => import('../../pages/QRCode'), 'QRCodePage'),
  },
  {
    path: '/rate',
    element: createLazyRouteElement(() => import('../../pages/Rate'), 'RatePage'),
  },

  {
    path: '/scrollbar',
    element: createLazyRouteElement(() => import('../../pages/Scrollbar'), 'ScrollbarPage'),
  },
  {
    path: '/steps',
    element: createLazyRouteElement(() => import('../../pages/Steps'), 'StepsPage'),
  },
  {
    path: '/table',
    element: createLazyRouteElement(() => import('../../pages/Table'), 'TablePage'),
  },
  {
    path: '/tabs',
    element: createLazyRouteElement(() => import('../../pages/Tabs'), 'TabsPage'),
  },
  {
    path: '/timeline',
    element: createLazyRouteElement(() => import('../../pages/Timeline'), 'TimelinePage'),
  },
  {
    path: '/toast',
    element: createLazyRouteElement(() => import('../../pages/Toast'), 'ToastPage'),
  },
  {
    path: '/toggle',
    element: createLazyRouteElement(() => import('../../pages/Toggle'), 'TogglePage'),
  },
  {
    path: '/sortable',
    element: createLazyRouteElement(() => import('../../pages/Sortable'), 'SortablePage'),
  },
  {
    path: '/interactions',
    element: createLazyRouteElement(() => import('../../pages/Interactions'), 'InteractionsPage'),
  },
  {
    path: '/resizable',
    element: createLazyRouteElement(() => import('../../pages/Resizable'), 'ResizablePage'),
  },
  {
    path: '/textarea',
    element: createLazyRouteElement(() => import('../../pages/Textarea'), 'TextareaPage'),
  },
  {
    path: '/theme-provider',
    element: createLazyRouteElement(() => import('../../pages/ThemeProvider'), 'ThemeProviderPage'),
  },
].sort((left, right) => left.path.localeCompare(right.path))
