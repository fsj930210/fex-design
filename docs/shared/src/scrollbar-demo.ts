export const scrollbarColumns = [
  'Order',
  'Customer and delivery contact information',
  'Delivery address with additional instructions',
  'Status',
  'Amount',
] as const
export const scrollbarDemoLines = Array.from(
  { length: 16 },
  (_, index) => `第 ${index + 1} 行 · 向下滚动查看内容，横向区域保持原生滚动。`,
)
export const scrollbarConfigurationLines = Array.from(
  { length: 20 },
  (_, index) => `第 ${index + 1} 行 · 滚动后切换配置，当前位置保持不变。`,
)
export const scrollbarViewportLines = Array.from(
  { length: 20 },
  (_, index) => `第 ${index + 1} 行 · 点击滚动容器后可使用键盘滚动。`,
)
export const scrollbarRows = Array.from({ length: 24 }, (_, index) => ({
  id: 'ORD-' + String(index + 1).padStart(3, '0'),
  customer: 'Customer ' + (index + 1),
  address: 'Building ' + (index + 1) + ', Riverside Avenue',
  status: index % 2 ? 'Delivered' : 'Processing',
  amount: '$' + (120 + index * 15),
}))

/** Table owns header measurement; Scrollbar only consumes the resulting CSS offset. */
export function observeScrollbarHeader(root: HTMLElement, header: HTMLElement): () => void {
  const property = '--table-header-height'
  const previous = root.style.getPropertyValue(property)
  const priority = root.style.getPropertyPriority(property)
  const update = () =>
    root.style.setProperty(property, header.getBoundingClientRect().height + 'px')
  update()
  const observer = new ResizeObserver(update)
  observer.observe(header)
  return () => {
    observer.disconnect()
    if (previous) root.style.setProperty(property, previous, priority)
    else root.style.removeProperty(property)
  }
}
