
// Sorting Algorithm Code Snippets
export const bubbleSortSnippets = [
  {
    id: 'bubbleInit',
    code: 'function bubbleSort(array) {',
    description: 'Starting the bubble sort function definition'
  },
  {
    id: 'bubbleLoopOuter',
    code: '  for (let i = 0; i < array.length; i++) {',
    description: 'Outer loop iterates through each element'
  },
  {
    id: 'bubbleLoopInner',
    code: '    for (let j = 0; j < array.length - i - 1; j++) {',
    description: 'Inner loop for comparing adjacent elements'
  },
  {
    id: 'bubbleCompare',
    code: '      if (array[j] > array[j + 1]) {',
    description: 'Compare adjacent elements'
  },
  {
    id: 'bubbleSwap',
    code: '        [array[j], array[j + 1]] = [array[j + 1], array[j]];',
    description: 'Swap if the element is greater than the next element'
  },
  {
    id: 'bubbleCloseIf',
    code: '      }',
    description: ''
  },
  {
    id: 'bubbleCloseInner',
    code: '    }',
    description: 'End of inner loop iteration'
  },
  {
    id: 'bubbleCloseOuter',
    code: '  }',
    description: 'End of outer loop iteration'
  },
  {
    id: 'bubbleReturn',
    code: '  return array;',
    description: 'Return the sorted array'
  },
  {
    id: 'bubbleEnd',
    code: '}',
    description: 'End of bubble sort function'
  }
];

export const selectionSortSnippets = [
  {
    id: 'selectionInit',
    code: 'function selectionSort(array) {',
    description: 'Starting the selection sort function definition'
  },
  {
    id: 'selectionLoopOuter',
    code: '  for (let i = 0; i < array.length; i++) {',
    description: 'Outer loop iterates through each element'
  },
  {
    id: 'selectionMinIndex',
    code: '    let minIndex = i;',
    description: 'Assume the current position has the minimum value'
  },
  {
    id: 'selectionLoopInner',
    code: '    for (let j = i + 1; j < array.length; j++) {',
    description: 'Inner loop to find the minimum element'
  },
  {
    id: 'selectionCompare',
    code: '      if (array[j] < array[minIndex]) {',
    description: 'Compare to find the minimum element'
  },
  {
    id: 'selectionUpdateMin',
    code: '        minIndex = j;',
    description: 'Update the minimum index if a smaller element is found'
  },
  {
    id: 'selectionCloseIf',
    code: '      }',
    description: ''
  },
  {
    id: 'selectionCloseInner',
    code: '    }',
    description: 'End of inner loop'
  },
  {
    id: 'selectionCheck',
    code: '    if (minIndex !== i) {',
    description: 'Check if we need to swap (minimum is not at current position)'
  },
  {
    id: 'selectionSwap',
    code: '      [array[i], array[minIndex]] = [array[minIndex], array[i]];',
    description: 'Swap the current element with the minimum element'
  },
  {
    id: 'selectionCloseCheck',
    code: '    }',
    description: ''
  },
  {
    id: 'selectionCloseOuter',
    code: '  }',
    description: 'End of outer loop iteration'
  },
  {
    id: 'selectionReturn',
    code: '  return array;',
    description: 'Return the sorted array'
  },
  {
    id: 'selectionEnd',
    code: '}',
    description: 'End of selection sort function'
  }
];

export const insertionSortSnippets = [
  {
    id: 'insertionInit',
    code: 'function insertionSort(array) {',
    description: 'Starting the insertion sort function definition'
  },
  {
    id: 'insertionLoopOuter',
    code: '  for (let i = 1; i < array.length; i++) {',
    description: 'Loop through array starting from the second element'
  },
  {
    id: 'insertionKey',
    code: '    let key = array[i];',
    description: 'Store the current element as key'
  },
  {
    id: 'insertionIndex',
    code: '    let j = i - 1;',
    description: 'Initialize j to check elements before key'
  },
  {
    id: 'insertionWhile',
    code: '    while (j >= 0 && array[j] > key) {',
    description: 'While previous elements are greater than key'
  },
  {
    id: 'insertionShift',
    code: '      array[j + 1] = array[j];',
    description: 'Shift elements forward to make space for key'
  },
  {
    id: 'insertionDecrement',
    code: '      j--;',
    description: 'Move to the previous element'
  },
  {
    id: 'insertionCloseWhile',
    code: '    }',
    description: 'End of while loop'
  },
  {
    id: 'insertionInsert',
    code: '    array[j + 1] = key;',
    description: 'Insert key at the correct position'
  },
  {
    id: 'insertionCloseOuter',
    code: '  }',
    description: 'End of outer loop iteration'
  },
  {
    id: 'insertionReturn',
    code: '  return array;',
    description: 'Return the sorted array'
  },
  {
    id: 'insertionEnd',
    code: '}',
    description: 'End of insertion sort function'
  }
];

export const quickSortSnippets = [
  {
    id: 'quickInit',
    code: 'function quickSort(array, low = 0, high = array.length - 1) {',
    description: 'Starting the quick sort function definition'
  },
  {
    id: 'quickCheck',
    code: '  if (low < high) {',
    description: 'Check if there's more than one element to sort'
  },
  {
    id: 'quickPartition',
    code: '    const pivotIndex = partition(array, low, high);',
    description: 'Partition the array and get pivot index'
  },
  {
    id: 'quickRecurseLeft',
    code: '    quickSort(array, low, pivotIndex - 1);',
    description: 'Recursively sort elements before pivot'
  },
  {
    id: 'quickRecurseRight',
    code: '    quickSort(array, pivotIndex + 1, high);',
    description: 'Recursively sort elements after pivot'
  },
  {
    id: 'quickCloseIf',
    code: '  }',
    description: ''
  },
  {
    id: 'quickReturn',
    code: '  return array;',
    description: 'Return the sorted array'
  },
  {
    id: 'quickEnd',
    code: '}',
    description: 'End of quickSort function'
  },
  {
    id: 'partitionInit',
    code: 'function partition(array, low, high) {',
    description: 'Starting the partition function'
  },
  {
    id: 'partitionPivot',
    code: '  const pivot = array[high];',
    description: 'Choose the last element as pivot'
  },
  {
    id: 'partitionIndex',
    code: '  let i = low - 1;',
    description: 'Initialize index of smaller element'
  },
  {
    id: 'partitionLoop',
    code: '  for (let j = low; j < high; j++) {',
    description: 'Loop through array from low to high-1'
  },
  {
    id: 'partitionCompare',
    code: '    if (array[j] <= pivot) {',
    description: 'If current element is smaller than pivot'
  },
  {
    id: 'partitionIncrement',
    code: '      i++;',
    description: 'Increment index of smaller element'
  },
  {
    id: 'partitionSwap',
    code: '      [array[i], array[j]] = [array[j], array[i]];',
    description: 'Swap elements'
  },
  {
    id: 'partitionCloseIf',
    code: '    }',
    description: ''
  },
  {
    id: 'partitionCloseLoop',
    code: '  }',
    description: 'End of loop'
  },
  {
    id: 'partitionFinalSwap',
    code: '  [array[i + 1], array[high]] = [array[high], array[i + 1]];',
    description: 'Swap pivot to its final position'
  },
  {
    id: 'partitionReturn',
    code: '  return i + 1;',
    description: 'Return the pivot index'
  },
  {
    id: 'partitionEnd',
    code: '}',
    description: 'End of partition function'
  }
];

export const mergeSortSnippets = [
  {
    id: 'mergeInit',
    code: 'function mergeSort(array) {',
    description: 'Starting the merge sort function definition'
  },
  {
    id: 'mergeCheck',
    code: '  if (array.length <= 1) {',
    description: 'Base case: array with 0 or 1 element is already sorted'
  },
  {
    id: 'mergeReturn',
    code: '    return array;',
    description: 'Return the array if it has 0 or 1 element'
  },
  {
    id: 'mergeCloseCheck',
    code: '  }',
    description: ''
  },
  {
    id: 'mergeSplit',
    code: '  const mid = Math.floor(array.length / 2);',
    description: 'Find the middle of the array'
  },
  {
    id: 'mergeLeft',
    code: '  const left = mergeSort(array.slice(0, mid));',
    description: 'Sort the left half recursively'
  },
  {
    id: 'mergeRight',
    code: '  const right = mergeSort(array.slice(mid));',
    description: 'Sort the right half recursively'
  },
  {
    id: 'mergeCombine',
    code: '  return merge(left, right);',
    description: 'Merge the sorted halves'
  },
  {
    id: 'mergeEnd',
    code: '}',
    description: 'End of mergeSort function'
  },
  {
    id: 'mergeHelperInit',
    code: 'function merge(left, right) {',
    description: 'Starting the merge function to combine two sorted arrays'
  },
  {
    id: 'mergeResultInit',
    code: '  const result = [];',
    description: 'Initialize result array'
  },
  {
    id: 'mergeIndices',
    code: '  let i = 0, j = 0;',
    description: 'Initialize indices for left and right arrays'
  },
  {
    id: 'mergeWhile',
    code: '  while (i < left.length && j < right.length) {',
    description: 'While both arrays have elements to compare'
  },
  {
    id: 'mergeCompare',
    code: '    if (left[i] <= right[j]) {',
    description: 'Compare elements from left and right arrays'
  },
  {
    id: 'mergePushLeft',
    code: '      result.push(left[i]);',
    description: 'Add smaller element from left array'
  },
  {
    id: 'mergeIncrementLeft',
    code: '      i++;',
    description: 'Move to next element in left array'
  },
  {
    id: 'mergeElse',
    code: '    } else {',
    description: ''
  },
  {
    id: 'mergePushRight',
    code: '      result.push(right[j]);',
    description: 'Add smaller element from right array'
  },
  {
    id: 'mergeIncrementRight',
    code: '      j++;',
    description: 'Move to next element in right array'
  },
  {
    id: 'mergeCloseIf',
    code: '    }',
    description: ''
  },
  {
    id: 'mergeCloseWhile',
    code: '  }',
    description: 'End of comparison loop'
  },
  {
    id: 'mergeRemainingLeft',
    code: '  return result.concat(left.slice(i)).concat(right.slice(j));',
    description: 'Add any remaining elements and return result'
  },
  {
    id: 'mergeHelperEnd',
    code: '}',
    description: 'End of merge function'
  }
];

// Tree Traversal Algorithm Code Snippets
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

// Graph Algorithm Code Snippets
export const bfsSnippets = [
  {
    id: 'bfsInit',
    code: 'function bfs(graph, startNode) {',
    description: 'Starting the BFS function'
  },
  {
    id: 'bfsVisited',
    code: '  const visited = new Set();',
    description: 'Initialize set to track visited nodes'
  },
  {
    id: 'bfsQueue',
    code: '  const queue = [startNode];',
    description: 'Initialize queue with the starting node'
  },
  {
    id: 'bfsResult',
    code: '  const result = [];',
    description: 'Initialize array to store traversal result'
  },
  {
    id: 'bfsVisitStart',
    code: '  visited.add(startNode);',
    description: 'Mark the starting node as visited'
  },
  {
    id: 'bfsWhile',
    code: '  while (queue.length > 0) {',
    description: 'Continue until queue is empty'
  },
  {
    id: 'bfsDequeue',
    code: '    const currentNode = queue.shift();',
    description: 'Dequeue the next node'
  },
  {
    id: 'bfsProcess',
    code: '    result.push(currentNode);',
    description: 'Process the current node'
  },
  {
    id: 'bfsNeighbors',
    code: '    for (const neighbor of graph[currentNode]) {',
    description: 'Loop through all neighbors'
  },
  {
    id: 'bfsCheck',
    code: '      if (!visited.has(neighbor)) {',
    description: 'Check if neighbor has been visited'
  },
  {
    id: 'bfsEnqueue',
    code: '        queue.push(neighbor);',
    description: 'Enqueue the unvisited neighbor'
  },
  {
    id: 'bfsVisitNeighbor',
    code: '        visited.add(neighbor);',
    description: 'Mark the neighbor as visited'
  },
  {
    id: 'bfsCloseIf',
    code: '      }',
    description: ''
  },
  {
    id: 'bfsCloseNeighbors',
    code: '    }',
    description: 'End of neighbors loop'
  },
  {
    id: 'bfsCloseWhile',
    code: '  }',
    description: 'End of BFS while loop'
  },
  {
    id: 'bfsReturn',
    code: '  return result;',
    description: 'Return the traversal result'
  },
  {
    id: 'bfsEnd',
    code: '}',
    description: 'End of BFS function'
  }
];

export const dijkstraSnippets = [
  {
    id: 'dijkstraInit',
    code: 'function dijkstra(graph, startNode) {',
    description: 'Starting the Dijkstra algorithm function'
  },
  {
    id: 'dijkstraDistances',
    code: '  const distances = {};',
    description: 'Object to store distances from start node'
  },
  {
    id: 'dijkstraPrevious',
    code: '  const previous = {};',
    description: 'Object to store previous nodes'
  },
  {
    id: 'dijkstraNodes',
    code: '  const nodes = new Set(Object.keys(graph));',
    description: 'Set of all nodes in the graph'
  },
  {
    id: 'dijkstraInitNodes',
    code: '  // Initialize all distances to Infinity except start node',
    description: 'Set up initial distances'
  },
  {
    id: 'dijkstraForInit',
    code: '  for (const node of nodes) {',
    description: 'Loop through all nodes'
  },
  {
    id: 'dijkstraSetDistance',
    code: '    distances[node] = node === startNode ? 0 : Infinity;',
    description: 'Start node is 0, all others are Infinity'
  },
  {
    id: 'dijkstraCloseFor',
    code: '  }',
    description: 'End of initialization loop'
  },
  {
    id: 'dijkstraWhile',
    code: '  while (nodes.size > 0) {',
    description: 'Continue until all nodes are processed'
  },
  {
    id: 'dijkstraGetClosest',
    code: '    // Find closest node',
    description: 'Find the node with smallest distance'
  },
  {
    id: 'dijkstraMinInit',
    code: '    let smallestDistance = Infinity;',
    description: 'Initialize smallest distance'
  },
  {
    id: 'dijkstraClosestNode',
    code: '    let closestNode = null;',
    description: 'Initialize closest node'
  },
  {
    id: 'dijkstraFindMin',
    code: '    for (const node of nodes) {',
    description: 'Loop through unvisited nodes'
  },
  {
    id: 'dijkstraCompare',
    code: '      if (distances[node] < smallestDistance) {',
    description: 'Compare distances'
  },
  {
    id: 'dijkstraUpdateMin',
    code: '        smallestDistance = distances[node];',
    description: 'Update smallest distance'
  },
  {
    id: 'dijkstraUpdateNode',
    code: '        closestNode = node;',
    description: 'Update closest node'
  },
  {
    id: 'dijkstraCloseMinIf',
    code: '      }',
    description: ''
  },
  {
    id: 'dijkstraCloseMinFor',
    code: '    }',
    description: 'End of finding minimum'
  },
  {
    id: 'dijkstraCheckEnd',
    code: '    if (closestNode === null || distances[closestNode] === Infinity) {',
    description: 'Break if no path exists'
  },
  {
    id: 'dijkstraBreak',
    code: '      break;',
    description: 'No more reachable nodes'
  },
  {
    id: 'dijkstraCloseCheck',
    code: '    }',
    description: ''
  },
  {
    id: 'dijkstraRemoveNode',
    code: '    nodes.delete(closestNode);',
    description: 'Remove closest node from unvisited set'
  },
  {
    id: 'dijkstraCheckNeighbors',
    code: '    // Check all neighbors',
    description: 'Update distances to neighbors'
  },
  {
    id: 'dijkstraNeighborLoop',
    code: '    for (const neighbor in graph[closestNode]) {',
    description: 'Loop through neighbors of closest node'
  },
  {
    id: 'dijkstraCalcDistance',
    code: '      const distance = distances[closestNode] + graph[closestNode][neighbor];',
    description: 'Calculate new distance'
  },
  {
    id: 'dijkstraCompareDistance',
    code: '      if (distance < distances[neighbor]) {',
    description: 'Check if new path is shorter'
  },
  {
    id: 'dijkstraUpdateDistance',
    code: '        distances[neighbor] = distance;',
    description: 'Update the distance'
  },
  {
    id: 'dijkstraUpdatePrevious',
    code: '        previous[neighbor] = closestNode;',
    description: 'Update the previous node'
  },
  {
    id: 'dijkstraCloseUpdateIf',
    code: '      }',
    description: ''
  },
  {
    id: 'dijkstraCloseNeighborLoop',
    code: '    }',
    description: 'End of neighbors loop'
  },
  {
    id: 'dijkstraCloseWhile',
    code: '  }',
    description: 'End of main loop'
  },
  {
    id: 'dijkstraReturn',
    code: '  return { distances, previous };',
    description: 'Return distances and paths'
  },
  {
    id: 'dijkstraEnd',
    code: '}',
    description: 'End of Dijkstra function'
  }
];

// Map algorithm names to their code snippets
export const getCodeSnippetsForAlgorithm = (algorithm: string) => {
  switch (algorithm) {
    case 'bubble':
      return bubbleSortSnippets;
    case 'selection':
      return selectionSortSnippets;
    case 'insertion':
      return insertionSortSnippets;
    case 'quick':
      return quickSortSnippets;
    case 'merge':
      return mergeSortSnippets;
    case 'inOrder':
      return inOrderTraversalSnippets;
    case 'preOrder':
      return preOrderTraversalSnippets;
    case 'postOrder':
      return postOrderTraversalSnippets;
    case 'bfs':
      return bfsSnippets;
    case 'dijkstra':
      return dijkstraSnippets;
    default:
      return [];
  }
};

// Map sorting algorithm step indices to code snippet IDs
export const mapSortingStepToCodeSnippet = (algorithm: string, stepIndex: number, totalSteps: number) => {
  if (totalSteps <= 1) return null;
  
  // Normalize step position (0-1 range)
  const normalizedStep = stepIndex / (totalSteps - 1);
  
  switch (algorithm) {
    case 'bubble':
      if (normalizedStep === 0) return 'bubbleInit';
      if (normalizedStep < 0.2) return 'bubbleLoopOuter';
      if (normalizedStep < 0.4) return 'bubbleLoopInner';
      if (normalizedStep < 0.6) return 'bubbleCompare';
      if (normalizedStep < 0.8) return 'bubbleSwap';
      if (normalizedStep < 0.9) return 'bubbleCloseInner';
      return 'bubbleReturn';
      
    case 'selection':
      if (normalizedStep === 0) return 'selectionInit';
      if (normalizedStep < 0.2) return 'selectionLoopOuter';
      if (normalizedStep < 0.3) return 'selectionMinIndex';
      if (normalizedStep < 0.5) return 'selectionLoopInner';
      if (normalizedStep < 0.7) return 'selectionCompare';
      if (normalizedStep < 0.9) return 'selectionSwap';
      return 'selectionReturn';
      
    case 'insertion':
      if (normalizedStep === 0) return 'insertionInit';
      if (normalizedStep < 0.2) return 'insertionLoopOuter';
      if (normalizedStep < 0.3) return 'insertionKey';
      if (normalizedStep < 0.5) return 'insertionWhile';
      if (normalizedStep < 0.7) return 'insertionShift';
      if (normalizedStep < 0.9) return 'insertionInsert';
      return 'insertionReturn';
      
    case 'quick':
      if (normalizedStep === 0) return 'quickInit';
      if (normalizedStep < 0.2) return 'quickCheck';
      if (normalizedStep < 0.3) return 'partitionPivot';
      if (normalizedStep < 0.5) return 'partitionLoop';
      if (normalizedStep < 0.7) return 'partitionSwap';
      if (normalizedStep < 0.9) return 'partitionFinalSwap';
      return 'quickReturn';
      
    case 'merge':
      if (normalizedStep === 0) return 'mergeInit';
      if (normalizedStep < 0.2) return 'mergeSplit';
      if (normalizedStep < 0.4) return 'mergeLeft';
      if (normalizedStep < 0.6) return 'mergeRight';
      if (normalizedStep < 0.8) return 'mergeWhile';
      if (normalizedStep < 0.9) return 'mergePushLeft';
      return 'mergeRemainingLeft';
      
    default:
      return null;
  }
};

// Similar mapping functions for tree traversals and graph algorithms 
export const mapTreeTraversalStepToCodeSnippet = (traversalType: string, stepIndex: number, totalSteps: number) => {
  if (totalSteps <= 1) return null;
  
  const normalizedStep = stepIndex / (totalSteps - 1);
  
  switch (traversalType) {
    case 'inOrder':
      if (normalizedStep === 0) return 'inOrderInit';
      if (normalizedStep < 0.3) return 'inOrderCheck';
      if (normalizedStep < 0.5) return 'inOrderLeft';
      if (normalizedStep < 0.8) return 'inOrderRoot';
      return 'inOrderRight';
      
    case 'preOrder':
      if (normalizedStep === 0) return 'preOrderInit';
      if (normalizedStep < 0.3) return 'preOrderCheck';
      if (normalizedStep < 0.5) return 'preOrderRoot';
      if (normalizedStep < 0.8) return 'preOrderLeft';
      return 'preOrderRight';
      
    case 'postOrder':
      if (normalizedStep === 0) return 'postOrderInit';
      if (normalizedStep < 0.3) return 'postOrderCheck';
      if (normalizedStep < 0.5) return 'postOrderLeft';
      if (normalizedStep < 0.8) return 'postOrderRight';
      return 'postOrderRoot';
      
    default:
      return null;
  }
};
