import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VisualizerControls from '@/components/ui/VisualizerControls';
import { toast } from 'sonner';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface QueueVisualizerProps {
  className?: string;
}

const QueueVisualizer: React.FC<QueueVisualizerProps> = ({ className }) => {
  const [queue, setQueue] = useState<number[]>([10, 20, 30, 40]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  
  const animationRef = useRef<number | null>(null);
  const operationStepsRef = useRef<Array<{ queue: number[], active: number }>>([]);
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

  const handleEnqueue = () => {
    const value = parseInt(inputValue);
    
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight rear of queue
    if (queue.length > 0) {
      steps.push({ queue: [...queue], active: queue.length - 1 });
    }
    
    // Step 2: Add new element to rear
    const newQueue = [...queue, value];
    steps.push({ queue: newQueue, active: newQueue.length - 1 });
    
    // Final step: No highlights
    steps.push({ queue: newQueue, active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const handleDequeue = () => {
    if (queue.length === 0) {
      toast.error("Queue is empty");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight front of queue
    steps.push({ queue: [...queue], active: 0 });
    
    // Step 2: Remove front element
    const newQueue = [...queue.slice(1)];
    steps.push({ queue: newQueue, active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const handleFront = () => {
    if (queue.length === 0) {
      toast.error("Queue is empty");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight front of queue
    steps.push({ queue: [...queue], active: 0 });
    
    // Step 2: Keep highlighting for a moment
    steps.push({ queue: [...queue], active: 0 });
    
    // Step 3: Remove highlight
    steps.push({ queue: [...queue], active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const startAnimation = () => {
    if (currentStepRef.current >= operationStepsRef.current.length) {
      setIsRunning(false);
      setActiveIndex(-1);
      setQueue(operationStepsRef.current[operationStepsRef.current.length - 1].queue);
      setInputValue('');
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 300;
    
    const step = operationStepsRef.current[currentStepRef.current];
    setQueue(step.queue);
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
    setQueue([10, 20, 30, 40]);
    setInputValue('');
    toast.info("Queue reset");
  };

  const handleStepForward = () => {
    if (currentStepRef.current < operationStepsRef.current.length) {
      setIsPaused(true);
      
      const step = operationStepsRef.current[currentStepRef.current];
      setQueue(step.queue);
      setActiveIndex(step.active);
      
      currentStepRef.current++;
      
      if (currentStepRef.current >= operationStepsRef.current.length) {
        setIsRunning(false);
        setActiveIndex(-1);
        setQueue(operationStepsRef.current[operationStepsRef.current.length - 1].queue);
        setInputValue('');
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepRef.current > 0) {
      setIsPaused(true);
      currentStepRef.current--;
      
      const step = operationStepsRef.current[currentStepRef.current];
      setQueue(step.queue);
      setActiveIndex(step.active);
    }
  };

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-2">Queue Visualization</h2>
          <p className="text-muted-foreground">Visualize First-In-First-Out (FIFO) operations</p>
        </div>
        
        <div className="mb-8 flex justify-center overflow-x-auto">
          <div className="border border-border rounded-lg p-4 bg-muted/30 min-w-80">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Front</span>
              <span className="text-sm font-medium">Rear</span>
            </div>
            
            {queue.length === 0 ? (
              <div className="p-4 border border-dashed border-border rounded-md text-center text-muted-foreground">
                Empty Queue
              </div>
            ) : (
              <div className="flex justify-center">
                {queue.map((value, index) => (
                  <div 
                    key={index} 
                    className={`p-4 border border-border min-w-16 text-center mx-1 transition-all ${
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
            onClick={handleEnqueue} 
            disabled={isRunning}
            className="col-span-1"
          >
            Enqueue
          </Button>
          
          <Button 
            onClick={handleDequeue} 
            disabled={isRunning}
            className="col-span-1"
          >
            Dequeue
          </Button>
          
          <Button 
            onClick={handleFront} 
            disabled={isRunning}
            variant="outline"
            className="col-span-1"
          >
            Front
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

export default QueueVisualizer;
