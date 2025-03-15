
import { 
  bubbleSortSnippets, 
  selectionSortSnippets, 
  insertionSortSnippets,
  quickSortSnippets,
  mergeSortSnippets
} from './sortingSnippets';

import {
  inOrderTraversalSnippets,
  preOrderTraversalSnippets,
  postOrderTraversalSnippets
} from './treeSnippets';

import {
  bfsSnippets,
  dijkstraSnippets
} from './graphSnippets';

import {
  knapsackSnippets,
  lcsSnippets
} from './dpSnippets';

// Get code snippets for a specific algorithm
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
    case 'knapsack':
      return knapsackSnippets;
    case 'lcs':
      return lcsSnippets;
    default:
      return [];
  }
};
