
// In-order traversal code snippets
export const inOrderTraversalSnippets = [
  {
    id: 'inOrderInit',
    code: 'function inOrderTraversal(root) {',
    description: 'Starting the in-order traversal function'
  },
  {
    id: 'inOrderResultInit',
    code: '  const result = [];',
    description: 'Initialize array to store traversal result'
  },
  {
    id: 'inOrderHelperInit',
    code: '  function traverse(node) {',
    description: 'Helper function to traverse the tree'
  },
  {
    id: 'inOrderCheck',
    code: '    if (node === null) return;',
    description: 'Base case: return if node is null'
  },
  {
    id: 'inOrderLeft',
    code: '    traverse(node.left);',
    description: 'First, traverse left subtree recursively'
  },
  {
    id: 'inOrderRoot',
    code: '    result.push(node.value);',
    description: 'Then, visit the current node (root)'
  },
  {
    id: 'inOrderRight',
    code: '    traverse(node.right);',
    description: 'Finally, traverse right subtree recursively'
  },
  {
    id: 'inOrderHelperEnd',
    code: '  }',
    description: 'End of helper function'
  },
  {
    id: 'inOrderCall',
    code: '  traverse(root);',
    description: 'Call the helper function with the root'
  },
  {
    id: 'inOrderReturn',
    code: '  return result;',
    description: 'Return the traversal result'
  },
  {
    id: 'inOrderEnd',
    code: '}',
    description: 'End of in-order traversal function'
  }
];

// Pre-order traversal code snippets
export const preOrderTraversalSnippets = [
  {
    id: 'preOrderInit',
    code: 'function preOrderTraversal(root) {',
    description: 'Starting the pre-order traversal function'
  },
  {
    id: 'preOrderResultInit',
    code: '  const result = [];',
    description: 'Initialize array to store traversal result'
  },
  {
    id: 'preOrderHelperInit',
    code: '  function traverse(node) {',
    description: 'Helper function to traverse the tree'
  },
  {
    id: 'preOrderCheck',
    code: '    if (node === null) return;',
    description: 'Base case: return if node is null'
  },
  {
    id: 'preOrderRoot',
    code: '    result.push(node.value);',
    description: 'First, visit the current node (root)'
  },
  {
    id: 'preOrderLeft',
    code: '    traverse(node.left);',
    description: 'Then, traverse left subtree recursively'
  },
  {
    id: 'preOrderRight',
    code: '    traverse(node.right);',
    description: 'Finally, traverse right subtree recursively'
  },
  {
    id: 'preOrderHelperEnd',
    code: '  }',
    description: 'End of helper function'
  },
  {
    id: 'preOrderCall',
    code: '  traverse(root);',
    description: 'Call the helper function with the root'
  },
  {
    id: 'preOrderReturn',
    code: '  return result;',
    description: 'Return the traversal result'
  },
  {
    id: 'preOrderEnd',
    code: '}',
    description: 'End of pre-order traversal function'
  }
];

// Post-order traversal code snippets
export const postOrderTraversalSnippets = [
  {
    id: 'postOrderInit',
    code: 'function postOrderTraversal(root) {',
    description: 'Starting the post-order traversal function'
  },
  {
    id: 'postOrderResultInit',
    code: '  const result = [];',
    description: 'Initialize array to store traversal result'
  },
  {
    id: 'postOrderHelperInit',
    code: '  function traverse(node) {',
    description: 'Helper function to traverse the tree'
  },
  {
    id: 'postOrderCheck',
    code: '    if (node === null) return;',
    description: 'Base case: return if node is null'
  },
  {
    id: 'postOrderLeft',
    code: '    traverse(node.left);',
    description: 'First, traverse left subtree recursively'
  },
  {
    id: 'postOrderRight',
    code: '    traverse(node.right);',
    description: 'Then, traverse right subtree recursively'
  },
  {
    id: 'postOrderRoot',
    code: '    result.push(node.value);',
    description: 'Finally, visit the current node (root)'
  },
  {
    id: 'postOrderHelperEnd',
    code: '  }',
    description: 'End of helper function'
  },
  {
    id: 'postOrderCall',
    code: '  traverse(root);',
    description: 'Call the helper function with the root'
  },
  {
    id: 'postOrderReturn',
    code: '  return result;',
    description: 'Return the traversal result'
  },
  {
    id: 'postOrderEnd',
    code: '}',
    description: 'End of post-order traversal function'
  }
];
