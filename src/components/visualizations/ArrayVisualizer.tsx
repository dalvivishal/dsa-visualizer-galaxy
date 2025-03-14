
import React, { useState, useEffect, useRef } from 'react';
import { generateRandomArray, sleep } from '@/utils/algorithmUtils';
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

interface ArrayVisualizerProps {
  className?: string;
}

const ArrayVisualizer: React.FC<ArrayVisualizerProps> = ({ className }) => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(10);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [compareIndex, setCompareIndex] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [operation, setOperation] = useState<string>('traverse');
  
  const animationRef = useRef<number | null>(null);
  const operationStepsRef = useRef<number[][]>([]);
  const currentStepRef = useRef<number>(0);

  useEffect(() => {
    generateNewArray();
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [arraySize]);

  const generateNewArray = () => {
    const newArray = generateRandomArray(arraySize, 5, 100);
    setArray(newArray);
    resetState();
  };

  const resetState = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setCurrentIndex(-1);
    setCompareIndex(-1);
    setIsRunning(false);
    setIsPaused(false);
    operationStepsRef.current = [];
    currentStepRef.current = 0;
  };

  const traverse = async () => {
    resetState();
    setIsRunning(true);
    
    const steps: number[][] = [];
    for (let i = 0; i <= array.length; i++) {
      const step = [...array];
      steps.push(step);
    }
    
    operationStepsRef.current = steps;
    currentStepRef.current = 0;
    
    startAnimation();
  };

  const search = async (value: number) => {
    resetState();
    setIsRunning(true);
    
    const steps: number[][] = [];
    let found = false;
    
    for (let i = 0; i < array.length; i++) {
      const step = [...array];
      steps.push(step);
      
      if (array[i] === value) {
        found = true;
        break;
      }
    }
    
    operationStepsRef.current = steps;
    currentStepRef.current = 0;
    
    startAnimation();
    
    return found;
  };

  const startAnimation = () => {
    if (currentStepRef.current >= operationStepsRef.current.length) {
      setIsRunning(false);
      setCurrentIndex(-1);
      setCompareIndex(-1);
      toast.success("Operation completed!");
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 150;
    
    setCurrentIndex(currentStepRef.current);
    
    if (currentStepRef.current < array.length - 1) {
      setCompareIndex(currentStepRef.current + 1);
    } else {
      setCompareIndex(-1);
    }
    
    currentStepRef.current++;
    
    animationRef.current = window.setTimeout(() => {
      if (!isPaused) {
        startAnimation();
      }
    }, delayMs);
  };

  const handlePlay = () => {
    if (!isRunning) {
      if (operation === 'traverse') {
        traverse();
      } else {
        search(array[Math.floor(Math.random() * array.length)]);
      }
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
    toast.info("Operation reset");
  };

  const handleStepForward = () => {
    if (currentStepRef.current < operationStepsRef.current.length) {
      setIsPaused(true);
      
      setCurrentIndex(currentStepRef.current);
      
      if (currentStepRef.current < array.length - 1) {
        setCompareIndex(currentStepRef.current + 1);
      } else {
        setCompareIndex(-1);
      }
      
      currentStepRef.current++;
      
      if (currentStepRef.current >= operationStepsRef.current.length) {
        setIsRunning(false);
        setCurrentIndex(-1);
        setCompareIndex(-1);
        toast.success("Operation completed!");
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepRef.current > 0) {
      setIsPaused(true);
      
      currentStepRef.current--;
      
      setCurrentIndex(currentStepRef.current);
      
      if (currentStepRef.current < array.length - 1) {
        setCompareIndex(currentStepRef.current + 1);
      } else {
        setCompareIndex(-1);
      }
    }
  };

  const getBarColor = (index: number) => {
    if (index === currentIndex) return 'bg-primary';
    if (index === compareIndex) return 'bg-accent';
    return 'bg-secondary';
  };

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-medium mb-2">Array Visualization</h2>
            <p className="text-muted-foreground">Visualize basic array operations</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select
              value={operation}
              onValueChange={setOperation}
              disabled={isRunning}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="traverse">Traverse</SelectItem>
                <SelectItem value="search">Linear Search</SelectItem>
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
                    transform: index === currentIndex || index === compareIndex ? 'translateY(-10px)' : 'translateY(0)',
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

export default ArrayVisualizer;
