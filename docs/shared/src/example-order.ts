export interface ExampleScene {
  id: string
  title: string
  description: string
  height?: number
}

const directionIds = new Set(['direction', 'rtl', 'ltr-rtl', 'reading-direction'])
const cssVariableIds = new Set(['css-variables', 'css-vars'])
const semanticStyleIds = new Set(['semantic-styles', 'structured-styles', 'styling'])

const middleGroups = [
  [
    'types',
    'variants',
    'variant',
    'appearance',
    'sizes',
    'size',
    'shape',
    'colors',
    'color',
    'affixes',
  ],
  ['content', 'icon', 'group', 'group-count', 'max-count', 'picker', 'format', 'step', 'options'],
  [
    'range',
    'multiple',
    'page-range',
    'page-size-options',
    'layout',
    'navigation',
    'overflow',
    'hide-on-single-page',
  ],
  [
    'disabled',
    'disabled-date',
    'disabled-time',
    'loading',
    'validation',
    'constraints',
    'allow-empty',
    'locale',
  ],
  ['controlled', 'dynamic', 'confirm', 'presets', 'footer'],
  [
    'custom',
    'trigger',
    'item',
    'panel',
    'container',
    'placement',
    'offset',
    'progress',
    'click-lock',
  ],
] as const

function groupFor(id: string) {
  const normalized = id.toLowerCase()
  const index = middleGroups.findIndex((group) =>
    group.some((token) => normalized === token || normalized.startsWith(`${token}-`)),
  )
  return index === -1 ? middleGroups.length : index
}

function tailRank(id: string) {
  const normalized = id.toLowerCase()
  if (directionIds.has(normalized)) return 0
  if (cssVariableIds.has(normalized)) return 1
  if (semanticStyleIds.has(normalized)) return 2
  if (normalized === 'logic' || normalized.startsWith('use-') || normalized.endsWith('-logic'))
    return 3
  return -1
}

export function sortExampleScenes<T extends ExampleScene>(scenes: readonly T[]): T[] {
  return scenes
    .map((scene, index) => ({ scene: normalizeExampleScene(scene), index }))
    .sort((a, b) => {
      const aBasic = a.scene.id === 'basic' ? 0 : 1
      const bBasic = b.scene.id === 'basic' ? 0 : 1
      if (aBasic !== bBasic) return aBasic - bBasic

      const aTail = tailRank(a.scene.id)
      const bTail = tailRank(b.scene.id)
      if (aTail !== -1 || bTail !== -1) {
        if (aTail === -1) return -1
        if (bTail === -1) return 1
        return aTail - bTail
      }

      const groupDifference = groupFor(a.scene.id) - groupFor(b.scene.id)
      if (groupDifference) return groupDifference
      return a.scene.id.localeCompare(b.scene.id) || a.index - b.index
    })
    .map(({ scene }) => scene)
}

function normalizeExampleScene<T extends ExampleScene>(scene: T): T {
  const titleById: Record<string, string> = {
    basic: '\u57fa\u672c\u7528\u6cd5',
    direction: 'LTR \u4e0e RTL',
    rtl: 'LTR \u4e0e RTL',
    'ltr-rtl': 'LTR \u4e0e RTL',
    'reading-direction': 'LTR \u4e0e RTL',
    'css-variables': 'CSS \u53d8\u91cf',
    'css-vars': 'CSS \u53d8\u91cf',
    'semantic-styles': '\u7ed3\u6784\u5316\u6837\u5f0f',
    'structured-styles': '\u7ed3\u6784\u5316\u6837\u5f0f',
    styling: '\u7ed3\u6784\u5316\u6837\u5f0f',
  }
  const title = titleById[scene.id]
  return title && title !== scene.title ? { ...scene, title } : scene
}
