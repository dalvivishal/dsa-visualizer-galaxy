import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VisualizerControls from '@/components/ui/VisualizerControls';
import { toast } from 'sonner';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface StackVisualizerProps {
  className?: string;
}

const StackVisualizer: React.FC<StackVisualizerProps> = ({ className }) => {
  const [stack, setStack] = useState<number[]>([40, 30, 20, 10]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  
  const animationRef = useRef<number | null>(null);
  const operationStepsRef = useRef<Array<{ stack: number[], active: number }>>([]);
  const currentStepRef = useRef<number>(0);

  const resetState = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setActiveIndex(-1);
    setIsRunning(false);
    setIsPaused(false);
    operationStepsRef.current = [];
    currentStepRef.current = 0;
  };

  const handlePush = () => {
    const value = parseInt(inputValue);
    
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight top of stack
    if (stack.length > 0) {
      steps.push({ stack: [...stack], active: 0 });
    }
    
    // Step 2: Add new element to top
    const newStack = [value, ...stack];
    steps.push({ stack: newStack, active: 0 });
    
    // Final step: No highlights
    steps.push({ stack: newStack, active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const handlePop = () => {
    if (stack.length === 0) {
      toast.error("Stack is empty");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight top of stack
    steps.push({ stack: [...stack], active: 0 });
    
    // Step 2: Remove top element
    const newStack = [...stack.slice(1)];
    steps.push({ stack: newStack, active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const handlePeek = () => {
    if (stack.length === 0) {
      toast.error("Stack is empty");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight top of stack
    steps.push({ stack: [...stack], active: 0 });
    
    // Step 2: Keep highlighting for a moment
    steps.push({ stack: [...stack], active: 0 });
    
    // Step 3: Remove highlight
    steps.push({ stack: [...stack], active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const startAnimation = () => {
    if (currentStepRef.current >= operationStepsRef.current.length) {
      setIsRunning(false);
      setActiveIndex(-1);
      setStack(operationStepsRef.current[operationStepsRef.current.length - 1].stack);
      setInputValue('');
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 300;
    
    const step = operationStepsRef.current[currentStepRef.current];
    setStack(step.stack);
    setActiveIndex(step.active);
    
    currentStepRef.current++;
    
    animationRef.current = window.setTimeout(() => {
      if (!isPaused) {
        startAnimation();
      }
    }, delayMs);
  };

  const handlePlay = () => {
    if (!isRunning) {
      return;
    }
    setIsPaused(false);
    startAnimation();
  };

  const handlePause = () => {
    setIsPaused(true);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };

  const handleReset = () => {
    resetState();
    setStack([40, 30, 20, 10]);
    setInputValue('');
    toast.info("Stack reset");
  };

  const handleStepForward = () => {
    if (currentStepRef.current < operationStepsRef.current.length) {
      setIsPaused(true);
      
      const step = operationStepsRef.current[currentStepRef.current];
      setStack(step.stack);
      setActiveIndex(step.active);
      
      currentStepRef.current++;
      
      if (currentStepRef.current >= operationStepsRef.current.length) {
        setIsRunning(false);
        setActiveIndex(-1);
        setStack(operationStepsRef.current[operationStepsRef.current.length - 1].stack);
        setInputValue('');
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepRef.current > 0) {
      setIsPaused(true);
      currentStepRef.current--;
      
      const step = operationStepsRef.current[currentStepRef.current];
      setStack(step.stack);
      setActiveIndex(step.active);
    }
  };

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-2">Stack Visualization</h2>
          <p className="text-muted-foreground">Visualize Last-In-First-Out (LIFO) operations</p>
        </div>
        
        <div className="mb-8 flex justify-center">
          <div className="w-48 border border-border rounded-lg p-4 bg-muted/30">
            <div className="text-center mb-4">
              <span className="text-lg font-medium">Stack</span>
            </div>
            
            {stack.length === 0 ? (
              <div className="p-4 border border-dashed border-border rounded-md text-center text-muted-foreground">
                Empty Stack
              </div>
            ) : (
              <div className="flex flex-col-reverse">
                {stack.map((value, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border border-border rounded-md text-center mb-1 transition-all ${
                      index === activeIndex ? 'bg-primary text-primary-foreground scale-105' : 'bg-background'
                    }`}
                  >
                    {value}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <Input
            type="number"
            placeholder="Enter value"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isRunning}
          />
          
          <Button 
            onClick={handlePush} 
            disabled={isRunning}
            className="col-span-1"
          >
            Push
          </Button>
          
          <Button 
            onClick={handlePop} 
            disabled={isRunning}
            className="col-span-1"
          >
            Pop
          </Button>
          
          <Button 
            onClick={handlePeek} 
            disabled={isRunning}
            variant="outline"
            className="col-span-1"
          >
            Peek
          </Button>
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

export default StackVisualizer;
