
import React, { useState, useEffect, useRef } from 'react';
import {
  createBinaryTree,
  TreeNode,
  inOrderTraversal,
  preOrderTraversal,
  postOrderTraversal
} from '@/utils/algorithmUtils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import VisualizerControls from '@/components/ui/VisualizerControls';
import { toast } from 'sonner';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { mapTreeTraversalStepToCodeSnippet } from '@/utils/codeSnippets';

interface TreeNodeVisualizerProps {
  node: TreeNode;
  xPosition: number;
  yPosition: number;
  level: number;
  maxLevel: number;
  activeNode: number | null;
}

const TreeNodeVisualizer: React.FC<TreeNodeVisualizerProps> = ({
  node,
  xPosition,
  yPosition,
  level,
  maxLevel,
  activeNode
}) => {
  const spacing = Math.pow(2, maxLevel - level) * 30;
  const isActive = activeNode === node.value;
  
  return (
    <div className="absolute" style={{ left: `${xPosition}px`, top: `${yPosition}px` }}>
      {/* Node */}
      <div 
        className={`node h-12 w-12 ${isActive ? 'node-active' : 'node-default'}`}
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        <div className="text-sm font-medium">{node.value}</div>
      </div>
      
      {/* Left child */}
      {node.left && (
        <>
          <div 
            className="absolute bg-muted-foreground"
            style={{
              width: '2px',
              height: `${spacing}px`,
              left: `-${spacing}px`,
              top: '0',
              transform: `rotate(45deg)`,
              transformOrigin: 'top right',
            }}
          />
          <TreeNodeVisualizer
            node={node.left}
            xPosition={xPosition - spacing}
            yPosition={yPosition + spacing}
            level={level + 1}
            maxLevel={maxLevel}
            activeNode={activeNode}
          />
        </>
      )}
      
      {/* Right child */}
      {node.right && (
        <>
          <div 
            className="absolute bg-muted-foreground"
            style={{
              width: '2px',
              height: `${spacing}px`,
              left: `${spacing}px`,
              top: '0',
              transform: `rotate(-45deg)`,
              transformOrigin: 'top left',
            }}
          />
          <TreeNodeVisualizer
            node={node.right}
            xPosition={xPosition + spacing}
            yPosition={yPosition + spacing}
            level={level + 1}
            maxLevel={maxLevel}
            activeNode={activeNode}
          />
        </>
      )}
    </div>
  );
};

interface BinaryTreeVisualizerProps {
  className?: string;
  traversalType?: string; // Make this prop optional with a default value
}

const BinaryTreeVisualizer: React.FC<BinaryTreeVisualizerProps> = ({ className, traversalType: externalTraversalType }) => {
  const [tree, setTree] = useState<TreeNode | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [traversalType, setTraversalType] = useState<string>(externalTraversalType || 'inorder');
  const [traversalResult, setTraversalResult] = useState<number[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  
  const animationRef = useRef<number | null>(null);
  const traversalStepsRef = useRef<Array<{ values: number[], active: number }>>([]);
  const currentStepRef = useRef<number>(0);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  // Update internal traversalType when externalTraversalType changes
  useEffect(() => {
    if (externalTraversalType) {
      setTraversalType(externalTraversalType.toLowerCase());
    }
  }, [externalTraversalType]);

  useEffect(() => {
    initializeTree();
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const initializeTree = () => {
    const treeValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, null, null, 11];
    const newTree = createBinaryTree(treeValues);
    setTree(newTree);
    resetState();
  };

  const resetState = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setActiveNode(null);
    setTraversalResult([]);
    setIsRunning(false);
    setIsPaused(false);
    traversalStepsRef.current = [];
    currentStepRef.current = 0;
  };

  const getTraversalSteps = () => {
    if (!tree) return [];
    
    switch (traversalType) {
      case 'inorder':
        return inOrderTraversal(tree);
      case 'preorder':
        return preOrderTraversal(tree);
      case 'postorder':
        return postOrderTraversal(tree);
      default:
        return inOrderTraversal(tree);
    }
  };

  const startTraversal = () => {
    resetState();
    setIsRunning(true);
    
    const steps = getTraversalSteps();
    traversalStepsRef.current = steps;
    currentStepRef.current = 0;
    
    startAnimation();
  };

  const startAnimation = () => {
    if (currentStepRef.current >= traversalStepsRef.current.length) {
      setIsRunning(false);
      setActiveNode(null);
      toast.success(`${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} traversal completed!`);
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 300;
    
    const step = traversalStepsRef.current[currentStepRef.current];
    setTraversalResult(step.values);
    setActiveNode(step.active);
    
    currentStepRef.current++;
    
    animationRef.current = window.setTimeout(() => {
      if (!isPaused) {
        startAnimation();
      }
    }, delayMs);
  };

  const handlePlay = () => {
    if (!isRunning) {
      startTraversal();
    } else {
      setIsPaused(false);
      startAnimation();
    }
  };

  const handlePause = () => {
    setIsPaused(true);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const handleReset = () => {
    resetState();
    toast.info("Traversal reset");
  };

  const handleStepForward = () => {
    if (currentStepRef.current < traversalStepsRef.current.length) {
      setIsPaused(true);
      
      const step = traversalStepsRef.current[currentStepRef.current];
      setTraversalResult(step.values);
      setActiveNode(step.active);
      
      currentStepRef.current++;
      
      if (currentStepRef.current >= traversalStepsRef.current.length) {
        setIsRunning(false);
        setActiveNode(null);
        toast.success(`${traversalType.charAt(0).toUpperCase() + traversalType.slice(1)} traversal completed!`);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepRef.current > 0) {
      setIsPaused(true);
      currentStepRef.current--;
      
      if (currentStepRef.current > 0) {
        const step = traversalStepsRef.current[currentStepRef.current - 1];
        setTraversalResult(step.values);
        setActiveNode(step.active);
      } else {
        setTraversalResult([]);
        setActiveNode(null);
      }
    }
  };

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-medium mb-2">Binary Tree Visualization</h2>
            <p className="text-muted-foreground">Visualize tree traversal algorithms</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select
              value={traversalType}
              onValueChange={setTraversalType}
              disabled={isRunning}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select traversal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inorder">In-Order Traversal</SelectItem>
                <SelectItem value="preorder">Pre-Order Traversal</SelectItem>
                <SelectItem value="postorder">Post-Order Traversal</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={initializeTree} disabled={isRunning}>
              Reset Tree
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <div className="relative h-[400px] w-full overflow-hidden" ref={treeContainerRef}>
            {tree && (
              <div className="absolute left-1/2 top-12">
                <TreeNodeVisualizer
                  node={tree}
                  xPosition={0}
                  yPosition={0}
                  level={1}
                  maxLevel={4}
                  activeNode={activeNode}
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6 p-4 border border-border rounded-lg">
          <div className="text-sm text-muted-foreground mb-2">Traversal Result:</div>
          <div className="flex flex-wrap gap-2">
            {traversalResult.map((value, index) => (
              <div 
                key={index} 
                className={`
                  px-3 py-1 rounded-md text-sm font-medium
                  ${index === traversalResult.length - 1 && activeNode === value ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}
                `}
              >
                {value}
              </div>
            ))}
            {traversalResult.length === 0 && (
              <div className="text-muted-foreground italic">No traversal performed yet</div>
            )}
          </div>
        </div>
        
        <VisualizerControls
          isPlaying={isRunning && !isPaused}
          onPlay={handlePlay}
          onPause={handlePause}
          onReset={handleReset}
          onStepForward={handleStepForward}
          onStepBackward={handleStepBackward}
          speed={speed}
          onSpeedChange={setSpeed}
        />
      </Card>
    </AnimatedCard>
  );
};

export default BinaryTreeVisualizer;
