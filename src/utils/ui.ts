enum UIVersions {
  v1,
  v2,
}

type UIVersion = keyof typeof UIVersions

type DisplayModes = "none" | "block"

export function toggleUI() {
  const currVersion = localStorage.getItem("ui") as UIVersion
  const nextVersion = UIVersions[(UIVersions[currVersion] + 1) % 2] as UIVersion
  setUIDisplay(currVersion, "none")
  setUIDisplay(nextVersion, "block")
  localStorage.setItem("ui", nextVersion)
}

function setUIDisplay(version: UIVersion, displayMode: DisplayModes) { // [ ]: unmount and render instead
  ;(
    document.querySelector(`#root-ui-${version}`) as HTMLDivElement
  ).style.display = displayMode
}

export function initUI() {
  let currVersion = localStorage.getItem("ui") as UIVersion
  if (!currVersion) {
    localStorage.setItem("ui", "v1")
    currVersion = "v1"
  }

  setUIDisplay(currVersion, "block")
  const nextVersion = UIVersions[(UIVersions[currVersion] + 1) % 2] as UIVersion
  setUIDisplay(nextVersion, "none")
}
