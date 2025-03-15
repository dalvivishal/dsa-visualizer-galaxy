
// Map tree traversal step indices to code snippet IDs
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
