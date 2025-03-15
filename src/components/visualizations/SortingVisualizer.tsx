
import React, { useState, useEffect, useRef } from 'react';
import { 
  generateRandomArray, 
  bubbleSort, 
  selectionSort, 
  insertionSort,
  quickSort,
  mergeSort
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
import CodeExecutionVisualizer from '@/components/visualizations/CodeExecutionVisualizer';
import { 
  getCodeSnippetsForAlgorithm, 
  mapSortingStepToCodeSnippet 
} from '@/utils/codeSnippets';
import { toast } from 'sonner';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface SortingVisualizerProps {
  className?: string;
}

const SortingVisualizer: React.FC<SortingVisualizerProps> = ({ className }) => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(10);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [algorithm, setAlgorithm] = useState<string>('bubble');
  const [activeIndices, setActiveIndices] = useState<number[]>([]);
  const [activeCodeSnippetId, setActiveCodeSnippetId] = useState<string | null>(null);
  
  const animationRef = useRef<number | null>(null);
  const sortingStepsRef = useRef<number[][]>([]);
  const currentStepRef = useRef<number>(0);

  useEffect(() => {
    generateNewArray();
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [arraySize]);

  useEffect(() => {
    // Update active code snippet whenever algorithm changes
    setActiveCodeSnippetId(getCodeSnippetsForAlgorithm(algorithm)[0]?.id || null);
  }, [algorithm]);

  const generateNewArray = () => {
    const newArray = generateRandomArray(arraySize, 5, 100);
    setArray(newArray);
    resetState();
  };

  const resetState = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setActiveIndices([]);
    setIsRunning(false);
    setIsPaused(false);
    sortingStepsRef.current = [];
    currentStepRef.current = 0;
    // Reset code snippet to the first one for the selected algorithm
    setActiveCodeSnippetId(getCodeSnippetsForAlgorithm(algorithm)[0]?.id || null);
  };

  const getSortingSteps = (algorithmName: string, arr: number[]): number[][] => {
    switch (algorithmName) {
      case 'bubble':
        return bubbleSort(arr);
      case 'selection':
        return selectionSort(arr);
      case 'insertion':
        return insertionSort(arr);
      case 'quick':
        return quickSort(arr);
      case 'merge':
        return mergeSort(arr);
      default:
        return bubbleSort(arr);
    }
  };

  const startSorting = () => {
    resetState();
    setIsRunning(true);
    
    const steps = getSortingSteps(algorithm, array);
    sortingStepsRef.current = steps;
    currentStepRef.current = 0;
    
    startAnimation();
  };

  const startAnimation = () => {
    if (currentStepRef.current >= sortingStepsRef.current.length) {
      setIsRunning(false);
      setActiveIndices([]);
      toast.success(`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} sort completed!`);
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 150;
    
    const currentArray = sortingStepsRef.current[currentStepRef.current];
    setArray([...currentArray]);
    
    // Update the active code snippet based on current step
    updateActiveCodeSnippet();
    
    // Highlight indices that changed
    if (currentStepRef.current > 0) {
      const prevArray = sortingStepsRef.current[currentStepRef.current - 1];
      const changedIndices = currentArray.reduce((indices, val, i) => {
        if (val !== prevArray[i]) indices.push(i);
        return indices;
      }, [] as number[]);
      
      setActiveIndices(changedIndices);
    } else {
      setActiveIndices([]);
    }
    
    currentStepRef.current++;
    
    animationRef.current = window.setTimeout(() => {
      if (!isPaused) {
        startAnimation();
      }
    }, delayMs);
  };
  
  const updateActiveCodeSnippet = () => {
    const snippetId = mapSortingStepToCodeSnippet(
      algorithm, 
      currentStepRef.current,
      sortingStepsRef.current.length
    );
    
    if (snippetId) {
      setActiveCodeSnippetId(snippetId);
    }
  };

  const handlePlay = () => {
    if (!isRunning) {
      startSorting();
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
    generateNewArray();
    toast.info("Sorting reset");
  };

  const handleStepForward = () => {
    if (currentStepRef.current < sortingStepsRef.current.length) {
      setIsPaused(true);
      
      const currentArray = sortingStepsRef.current[currentStepRef.current];
      setArray([...currentArray]);
      
      // Update code snippet for this step
      updateActiveCodeSnippet();
      
      // Highlight indices that changed
      if (currentStepRef.current > 0) {
        const prevArray = sortingStepsRef.current[currentStepRef.current - 1];
        const changedIndices = currentArray.reduce((indices, val, i) => {
          if (val !== prevArray[i]) indices.push(i);
          return indices;
        }, [] as number[]);
        
        setActiveIndices(changedIndices);
      } else {
        setActiveIndices([]);
      }
      
      currentStepRef.current++;
      
      if (currentStepRef.current >= sortingStepsRef.current.length) {
        setIsRunning(false);
        setActiveIndices([]);
        toast.success(`${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} sort completed!`);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepRef.current > 0) {
      setIsPaused(true);
      currentStepRef.current--;
      
      // Update code snippet
      updateActiveCodeSnippet();
      
      if (currentStepRef.current > 0) {
        const currentArray = sortingStepsRef.current[currentStepRef.current - 1];
        setArray([...currentArray]);
        
        const prevArray = currentStepRef.current > 1 
          ? sortingStepsRef.current[currentStepRef.current - 2]
          : currentArray;
          
        const changedIndices = currentArray.reduce((indices, val, i) => {
          if (val !== prevArray[i]) indices.push(i);
          return indices;
        }, [] as number[]);
        
        setActiveIndices(changedIndices);
      } else {
        setArray([...sortingStepsRef.current[0]]);
        setActiveIndices([]);
      }
    }
  };

  const getBarColor = (index: number) => {
    if (activeIndices.includes(index)) return 'bg-primary';
    
    // If sorting is complete, show all bars as completed
    if (isRunning && currentStepRef.current >= sortingStepsRef.current.length - 1) {
      return 'bg-accent';
    }
    
    return 'bg-secondary';
  };

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-medium mb-2">Sorting Visualization</h2>
            <p className="text-muted-foreground">Compare different sorting algorithms</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select
              value={algorithm}
              onValueChange={setAlgorithm}
              disabled={isRunning}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select algorithm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bubble">Bubble Sort</SelectItem>
                <SelectItem value="selection">Selection Sort</SelectItem>
                <SelectItem value="insertion">Insertion Sort</SelectItem>
                <SelectItem value="quick">Quick Sort</SelectItem>
                <SelectItem value="merge">Merge Sort</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={arraySize.toString()}
              onValueChange={(value) => setArraySize(parseInt(value))}
              disabled={isRunning}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Array size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 elements</SelectItem>
                <SelectItem value="10">10 elements</SelectItem>
                <SelectItem value="15">15 elements</SelectItem>
                <SelectItem value="20">20 elements</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={generateNewArray} disabled={isRunning}>
              New Array
            </Button>
          </div>
        </div>
        
        {/* Code Execution Visualizer */}
        <CodeExecutionVisualizer 
          snippets={getCodeSnippetsForAlgorithm(algorithm)}
          activeSnippetId={activeCodeSnippetId}
          className="mb-6"
        />
        
        <div className="mb-6">
          <div className="flex items-end h-64 w-full justify-around">
            {array.map((value, index) => {
              const normalizedHeight = (value / 100) * 80;
              return (
                <div
                  key={index}
                  className={`transition-all duration-300 ease-in-out rounded-t-md ${getBarColor(index)}`}
                  style={{
                    height: `${normalizedHeight + 20}%`,
                    width: `${90 / arraySize}%`,
                    minWidth: '8px',
                    transform: activeIndices.includes(index) ? 'translateY(-10px)' : 'translateY(0)',
                  }}
                >
                  <div className="flex justify-center pt-2 text-xs font-medium">
                    {value}
                  </div>
                </div>
              );
            })}
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

export default SortingVisualizer;
