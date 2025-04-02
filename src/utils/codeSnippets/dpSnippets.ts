
import { CodeSnippet } from '@/components/visualizations/CodeExecutionVisualizer';

// Knapsack problem code snippets
export const knapsackSnippets: CodeSnippet[] = [
  {
    id: 'knapsack-intro',
    description: 'Knapsack Problem',
    code: `/**
 * 0/1 Knapsack Problem
 * 
 * Given weights and values of n items, put these items in a knapsack
 * of capacity W to get the maximum total value in the knapsack.
 * 
 * We can either take an item or leave it (0/1 property).
 */
function knapsack(values: number[], weights: number[], capacity: number): number {
  const n = values.length;
  // Create a 2D array for memoization
  const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));
  
  // Build the dp table bottom-up
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      // Current item's weight and value (0-indexed)
      const currentWeight = weights[i - 1];
      const currentValue = values[i - 1];
      
      if (currentWeight > w) {
        // Item is too heavy, can't include it
        dp[i][w] = dp[i - 1][w];
      } else {
        // Max of excluding or including current item
        dp[i][w] = Math.max(
          dp[i - 1][w],
          dp[i - 1][w - currentWeight] + currentValue
        );
      }
    }
  }
  
  return dp[n][capacity];
}`
  },
  {
    id: 'knapsack-init',
    description: 'Initialize DP Table',
    code: `// Create a 2D array for memoization
const dp = Array(n + 1).fill(null).map(() => Array(capacity + 1).fill(0));

// dp[i][w] represents the maximum value that can be obtained
// using items 0 to i-1 with knapsack capacity w`
  },
  {
    id: 'knapsack-fill',
    description: 'Fill DP Table',
    code: `// Build the dp table bottom-up
for (let i = 1; i <= n; i++) {
  for (let w = 0; w <= capacity; w++) {
    // Current item's weight and value (0-indexed)
    const currentWeight = weights[i - 1];
    const currentValue = values[i - 1];
    
    if (currentWeight > w) {
      // Item is too heavy, can't include it
      dp[i][w] = dp[i - 1][w];
    } else {
      // Max of excluding or including current item
      dp[i][w] = Math.max(
        dp[i - 1][w],                               // Exclude current item
        dp[i - 1][w - currentWeight] + currentValue // Include current item
      );
    }
  }
}`
  },
  {
    id: 'knapsack-backtrack',
    description: 'Backtrack for Solution',
    code: `function backtrackSolution(dp: number[][], weights: number[], n: number, capacity: number): number[] {
  const result: number[] = [];
  let w = capacity;
  
  // Backtrack from bottom-right of dp table
  for (let i = n; i > 0; i--) {
    // If this item was included in the optimal solution
    if (dp[i][w] !== dp[i-1][w]) {
      result.push(i - 1);  // Item index (0-based)
      w -= weights[i - 1]; // Reduce remaining capacity
    }
  }
  
  return result.reverse();
}`
  }
];

// Longest Common Subsequence code snippets
export const lcsSnippets: CodeSnippet[] = [
  {
    id: 'lcs-intro',
    description: 'Longest Common Subsequence',
    code: `/**
 * Longest Common Subsequence (LCS)
 * 
 * Given two sequences, find the length of the longest subsequence
 * present in both of them. A subsequence is a sequence that appears
 * in the same relative order, but not necessarily contiguous.
 */
function longestCommonSubsequence(text1: string, text2: string): string {
  const m = text1.length;
  const n = text2.length;
  
  // Create a 2D array for memoization
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  // Fill the dp table
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        // Characters match, add 1 to the diagonal value
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // Characters don't match, take max from left or above
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  // Backtrack to find the actual LCS
  return backtrackLCS(dp, text1, text2, m, n);
}`
  },
  {
    id: 'lcs-init',
    description: 'Initialize DP Table',
    code: `// Create a 2D array for memoization
const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

// dp[i][j] represents the length of LCS of text1[0...i-1] and text2[0...j-1]`
  },
  {
    id: 'lcs-fill',
    description: 'Fill DP Table',
    code: `// Fill the dp table
for (let i = 1; i <= m; i++) {
  for (let j = 1; j <= n; j++) {
    if (text1[i - 1] === text2[j - 1]) {
      // Characters match, add 1 to the diagonal value
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      // Characters don't match, take max from left or above
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}`
  },
  {
    id: 'lcs-backtrack',
    description: 'Backtrack for Solution',
    code: `function backtrackLCS(
  dp: number[][], 
  text1: string, 
  text2: string, 
  i: number, 
  j: number
): string {
  // Base case
  if (i === 0 || j === 0) {
    return "";
  }
  
  // If characters match
  if (text1[i - 1] === text2[j - 1]) {
    return backtrackLCS(dp, text1, text2, i - 1, j - 1) + text1[i - 1];
  }
  
  // If characters don't match, follow direction with larger value
  if (dp[i - 1][j] > dp[i][j - 1]) {
    return backtrackLCS(dp, text1, text2, i - 1, j);
  } else {
    return backtrackLCS(dp, text1, text2, i, j - 1);
  }
}`
  }
];
