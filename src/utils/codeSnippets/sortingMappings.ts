
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
