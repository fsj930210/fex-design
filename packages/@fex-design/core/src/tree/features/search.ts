import type { TreeFeatureRegistration } from '../feature-types'
import type { TreeKey, TreeNodeData, TreeSearchSubtreeOptions } from '../types'
import { getSearchSubtree } from '../get-search-subtree'

export interface SearchFeatureApi<TNode extends TreeNodeData> {
  getSubtree(options: TreeSearchSubtreeOptions<TNode>): readonly TNode[]
  getMatchedKeys(options: TreeSearchSubtreeOptions<TNode>): readonly TreeKey[]
}
export function searchFeature<TNode extends TreeNodeData>(): TreeFeatureRegistration<TNode> {
  return {
    options: undefined,
    feature: {
      id: 'search',
      setup: (context) =>
        ({
          getSubtree: (options) =>
            getSearchSubtree(context.getSnapshot().treeData, context.getFieldNames(), options),
          getMatchedKeys: (options) => {
            const matches: TreeKey[] = []
            for (const item of context.getItems().values()) {
              if (options.filterTreeNode(item.data, options.keyword)) matches.push(item.key)
            }
            return matches
          },
        }) satisfies SearchFeatureApi<TNode>,
    },
  }
}
