export function createRootElement(): HTMLDivElement {
  const rootElement = document.createElement("div")
  rootElement.setAttribute("id", "root")
  document.body.appendChild(rootElement)

  return rootElement
}

export let cleanUp: () => void

export function setCleanUp(cleanUpFunc: () => void): void {
  cleanUp = cleanUpFunc
}
