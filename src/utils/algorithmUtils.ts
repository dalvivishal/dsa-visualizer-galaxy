
// Array Sorting Algorithms
export const bubbleSort = (array: number[]): number[][] => {
  const steps: number[][] = [array.slice()];
  const n = array.length;
  let arr = array.slice();
  
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push(arr.slice());
      }
    }
  }
  
  return steps;
};

export const selectionSort = (array: number[]): number[][] => {
  const steps: number[][] = [array.slice()];
  const n = array.length;
  let arr = array.slice();
  
  for (let i = 0; i < n; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      steps.push(arr.slice());
    }
  }
  
  return steps;
};

export const insertionSort = (array: number[]): number[][] => {
  const steps: number[][] = [array.slice()];
  const n = array.length;
  let arr = array.slice();
  
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
      steps.push(arr.slice());
    }
    
    arr[j + 1] = key;
    steps.push(arr.slice());
  }
  
  return steps;
};

export const quickSort = (array: number[]): number[][] => {
  const steps: number[][] = [array.slice()];
  let arr = array.slice();
  
  const partition = (arr: number[], low: number, high: number): number => {
    const pivot = arr[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        steps.push(arr.slice());
      }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push(arr.slice());
    
    return i + 1;
  };
  
  const quickSortHelper = (arr: number[], low: number, high: number): void => {
    if (low < high) {
      const pi = partition(arr, low, high);
      
      quickSortHelper(arr, low, pi - 1);
      quickSortHelper(arr, pi + 1, high);
    }
  };
  
  quickSortHelper(arr, 0, arr.length - 1);
  return steps;
};

export const mergeSort = (array: number[]): number[][] => {
  const steps: number[][] = [array.slice()];
  let arr = array.slice();
  
  const merge = (arr: number[], left: number, mid: number, right: number): void => {
    const n1 = mid - left + 1;
    const n2 = right - mid;
    
    const L = new Array(n1);
    const R = new Array(n2);
    
    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    
    for (let j = 0; j < n2; j++) {
      R[j] = arr[mid + 1 + j];
    }
    
    let i = 0, j = 0, k = left;
    
    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      steps.push(arr.slice());
    }
    
    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
      steps.push(arr.slice());
    }
    
    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
      steps.push(arr.slice());
    }
  };
  
  const mergeSortHelper = (arr: number[], left: number, right: number): void => {
    if (left < right) {
      const mid = Math.floor((left + right) / 2);
      
      mergeSortHelper(arr, left, mid);
      mergeSortHelper(arr, mid + 1, right);
      
      merge(arr, left, mid, right);
    }
  };
  
  mergeSortHelper(arr, 0, arr.length - 1);
  return steps;
};

// Linked List Operations
export interface LinkedListNode {
  value: number;
  next: LinkedListNode | null;
}

export const createLinkedList = (values: number[]): LinkedListNode | null => {
  if (values.length === 0) return null;
  
  const head: LinkedListNode = { value: values[0], next: null };
  let current = head;
  
  for (let i = 1; i < values.length; i++) {
    current.next = { value: values[i], next: null };
    current = current.next;
  }
  
  return head;
};

export const linkedListToArray = (head: LinkedListNode | null): number[] => {
  const result: number[] = [];
  let current = head;
  
  while (current) {
    result.push(current.value);
    current = current.next;
  }
  
  return result;
};

export const insertNode = (
  head: LinkedListNode | null, 
  value: number, 
  position: number
): { head: LinkedListNode | null; steps: Array<{ nodes: number[], active: number }> } => {
  const steps: Array<{ nodes: number[], active: number }> = [];
  steps.push({ nodes: linkedListToArray(head), active: -1 });
  
  if (position === 0) {
    const newNode: LinkedListNode = { value, next: head };
    steps.push({ nodes: linkedListToArray(newNode), active: 0 });
    return { head: newNode, steps };
  }
  
  if (!head) return { head, steps };
  
  let current = head;
  let index = 0;
  
  while (current && index < position - 1) {
    steps.push({ nodes: linkedListToArray(head), active: index });
    current = current.next;
    index++;
  }
  
  if (!current) return { head, steps };
  
  steps.push({ nodes: linkedListToArray(head), active: index });
  
  const newNode: LinkedListNode = { value, next: current.next };
  current.next = newNode;
  
  steps.push({ nodes: linkedListToArray(head), active: position });
  
  return { head, steps };
};

export const deleteNode = (
  head: LinkedListNode | null, 
  position: number
): { head: LinkedListNode | null; steps: Array<{ nodes: number[], active: number }> } => {
  const steps: Array<{ nodes: number[], active: number }> = [];
  steps.push({ nodes: linkedListToArray(head), active: -1 });
  
  if (!head) return { head, steps };
  
  if (position === 0) {
    steps.push({ nodes: linkedListToArray(head), active: 0 });
    steps.push({ nodes: linkedListToArray(head.next), active: -1 });
    return { head: head.next, steps };
  }
  
  let current = head;
  let index = 0;
  
  while (current && index < position - 1) {
    steps.push({ nodes: linkedListToArray(head), active: index });
    current = current.next;
    index++;
  }
  
  if (!current || !current.next) return { head, steps };
  
  steps.push({ nodes: linkedListToArray(head), active: index });
  steps.push({ nodes: linkedListToArray(head), active: index + 1 });
  
  current.next = current.next.next;
  
  steps.push({ nodes: linkedListToArray(head), active: -1 });
  
  return { head, steps };
};

// Binary Tree Operations
export interface TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

export const createBinaryTree = (values: (number | null)[]): TreeNode | null => {
  if (values.length === 0 || values[0] === null) return null;
  
  const root: TreeNode = { value: values[0], left: null, right: null };
  const queue: TreeNode[] = [root];
  let i = 1;
  
  while (queue.length > 0 && i < values.length) {
    const node = queue.shift()!;
    
    if (i < values.length && values[i] !== null) {
      node.left = { value: values[i] as number, left: null, right: null };
      queue.push(node.left);
    }
    i++;
    
    if (i < values.length && values[i] !== null) {
      node.right = { value: values[i] as number, left: null, right: null };
      queue.push(node.right);
    }
    i++;
  }
  
  return root;
};

export const inOrderTraversal = (
  root: TreeNode | null
): Array<{ values: number[], active: number }> => {
  const result: number[] = [];
  const steps: Array<{ values: number[], active: number }> = [];
  
  const traverse = (node: TreeNode | null): void => {
    if (!node) return;
    
    traverse(node.left);
    result.push(node.value);
    steps.push({ values: [...result], active: node.value });
    traverse(node.right);
  };
  
  traverse(root);
  
  return steps;
};

export const preOrderTraversal = (
  root: TreeNode | null
): Array<{ values: number[], active: number }> => {
  const result: number[] = [];
  const steps: Array<{ values: number[], active: number }> = [];
  
  const traverse = (node: TreeNode | null): void => {
    if (!node) return;
    
    result.push(node.value);
    steps.push({ values: [...result], active: node.value });
    traverse(node.left);
    traverse(node.right);
  };
  
  traverse(root);
  
  return steps;
};

export const postOrderTraversal = (
  root: TreeNode | null
): Array<{ values: number[], active: number }> => {
  const result: number[] = [];
  const steps: Array<{ values: number[], active: number }> = [];
  
  const traverse = (node: TreeNode | null): void => {
    if (!node) return;
    
    traverse(node.left);
    traverse(node.right);
    result.push(node.value);
    steps.push({ values: [...result], active: node.value });
  };
  
  traverse(root);
  
  return steps;
};

// Pathfinding Algorithms
export type Cell = {
  row: number;
  col: number;
  isWall: boolean;
  isStart: boolean;
  isEnd: boolean;
  isVisited: boolean;
  isPath: boolean;
  distance: number;
  previousCell: Cell | null;
};

export type Grid = Cell[][];

export const createGrid = (
  rows: number, 
  cols: number, 
  startRow: number = 1, 
  startCol: number = 1, 
  endRow: number = rows - 2, 
  endCol: number = cols - 2
): Grid => {
  const grid: Grid = [];
  
  for (let row = 0; row < rows; row++) {
    const currentRow: Cell[] = [];
    
    for (let col = 0; col < cols; col++) {
      currentRow.push({
        row,
        col,
        isWall: false,
        isStart: row === startRow && col === startCol,
        isEnd: row === endRow && col === endCol,
        isVisited: false,
        isPath: false,
        distance: Infinity,
        previousCell: null,
      });
    }
    
    grid.push(currentRow);
  }
  
  return grid;
};

export const dijkstra = (grid: Grid): { steps: Grid[], path: Cell[] } => {
  const startCell = findStartCell(grid);
  if (!startCell) return { steps: [], path: [] };
  
  const steps: Grid[] = [];
  const visitedCellsInOrder: Cell[] = [];
  const unvisitedCells: Cell[] = getAllCells(grid);
  
  startCell.distance = 0;
  
  while (unvisitedCells.length) {
    sortCellsByDistance(unvisitedCells);
    const closestCell = unvisitedCells.shift()!;
    
    if (closestCell.isWall) continue;
    if (closestCell.distance === Infinity) break;
    
    closestCell.isVisited = true;
    visitedCellsInOrder.push(closestCell);
    
    if (closestCell.isEnd) {
      const path = getNodesInShortestPathOrder(closestCell);
      return { steps: steps, path };
    }
    
    updateUnvisitedNeighbors(closestCell, grid);
    steps.push(cloneGrid(grid));
  }
  
  return { steps, path: [] };
};

export const findStartCell = (grid: Grid): Cell | null => {
  for (const row of grid) {
    for (const cell of row) {
      if (cell.isStart) return cell;
    }
  }
  return null;
};

export const getAllCells = (grid: Grid): Cell[] => {
  const cells: Cell[] = [];
  for (const row of grid) {
    for (const cell of row) {
      cells.push(cell);
    }
  }
  return cells;
};

export const sortCellsByDistance = (cells: Cell[]): void => {
  cells.sort((a, b) => a.distance - b.distance);
};

export const updateUnvisitedNeighbors = (cell: Cell, grid: Grid): void => {
  const neighbors = getNeighbors(cell, grid);
  
  for (const neighbor of neighbors) {
    neighbor.distance = cell.distance + 1;
    neighbor.previousCell = cell;
  }
};

export const getNeighbors = (cell: Cell, grid: Grid): Cell[] => {
  const neighbors: Cell[] = [];
  const { row, col } = cell;
  
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall);
};

export const getNodesInShortestPathOrder = (finishCell: Cell): Cell[] => {
  const nodesInShortestPathOrder: Cell[] = [];
  let currentCell: Cell | null = finishCell;
  
  while (currentCell) {
    nodesInShortestPathOrder.unshift(currentCell);
    currentCell = currentCell.previousCell;
  }
  
  return nodesInShortestPathOrder;
};

export const cloneGrid = (grid: Grid): Grid => {
  return grid.map(row => row.map(cell => ({...cell})));
};

// Utility functions
export const generateRandomArray = (
  length: number = 10, 
  min: number = 1, 
  max: number = 100
): number[] => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
