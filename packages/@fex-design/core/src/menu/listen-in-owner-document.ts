/** Refs may run before a framework adopts a template node into its real document. */
export function listenInOwnerDocument(
  element: HTMLElement,
  isCurrent: () => boolean,
  listen: (document: Document) => void,
) {
  if (element.isConnected || element.ownerDocument.defaultView) listen(element.ownerDocument)
  else
    queueMicrotask(() => {
      if (isCurrent() && element.ownerDocument.defaultView) listen(element.ownerDocument)
    })
}
