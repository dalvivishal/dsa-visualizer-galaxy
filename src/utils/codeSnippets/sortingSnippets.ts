
// Bubble sort code snippets
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

// Selection sort code snippets
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

// Insertion sort code snippets
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

// Quick sort code snippets
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

// Merge sort code snippets
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
