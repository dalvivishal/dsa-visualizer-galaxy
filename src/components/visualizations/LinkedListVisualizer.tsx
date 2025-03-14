
import React, { useState, useEffect, useRef } from 'react';
import { 
  createLinkedList, 
  LinkedListNode, 
  linkedListToArray,
  insertNode,
  deleteNode
} from '@/utils/algorithmUtils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface LinkedListVisualizerProps {
  className?: string;
}

const LinkedListVisualizer: React.FC<LinkedListVisualizerProps> = ({ className }) => {
  const [list, setList] = useState<LinkedListNode | null>(null);
  const [nodes, setNodes] = useState<number[]>([]);
  const [operation, setOperation] = useState<string>('insert');
  const [inputValue, setInputValue] = useState<string>('');
  const [position, setPosition] = useState<string>('0');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [activeNode, setActiveNode] = useState<number>(-1);
  
  const animationRef = useRef<number | null>(null);
  const operationStepsRef = useRef<Array<{ nodes: number[], active: number }>>([]);
  const currentStepRef = useRef<number>(0);

  useEffect(() => {
    initializeList();
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);

  const initializeList = () => {
    const initialValues = [10, 20, 30, 40, 50];
    const newList = createLinkedList(initialValues);
    setList(newList);
    setNodes(linkedListToArray(newList));
    resetState();
  };

  const resetState = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setActiveNode(-1);
    setIsRunning(false);
    setIsPaused(false);
    operationStepsRef.current = [];
    currentStepRef.current = 0;
  };

  const handleOperation = () => {
    const value = parseInt(inputValue);
    const pos = parseInt(position);
    
    if (isNaN(value)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    if (isNaN(pos) || pos < 0 || pos > nodes.length) {
      toast.error(`Position must be between 0 and ${nodes.length}`);
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    let result;
    if (operation === 'insert') {
      result = insertNode(list, value, pos);
      setList(result.head);
      operationStepsRef.current = result.steps;
    } else if (operation === 'delete') {
      if (nodes.length === 0) {
        toast.error("Cannot delete from an empty list");
        setIsRunning(false);
        return;
      }
      result = deleteNode(list, pos);
      setList(result.head);
      operationStepsRef.current = result.steps;
    }
    
    currentStepRef.current = 0;
    startAnimation();
  };

  const startAnimation = () => {
    if (currentStepRef.current >= operationStepsRef.current.length) {
      setIsRunning(false);
      setActiveNode(-1);
      setNodes(linkedListToArray(list));
      toast.success(`${operation === 'insert' ? 'Insertion' : 'Deletion'} completed!`);
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 300;
    
    const step = operationStepsRef.current[currentStepRef.current];
    setNodes(step.nodes);
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
      handleOperation();
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
    initializeList();
    toast.info("Operation reset");
  };

  const handleStepForward = () => {
    if (currentStepRef.current < operationStepsRef.current.length) {
      setIsPaused(true);
      
      const step = operationStepsRef.current[currentStepRef.current];
      setNodes(step.nodes);
      setActiveNode(step.active);
      
      currentStepRef.current++;
      
      if (currentStepRef.current >= operationStepsRef.current.length) {
        setIsRunning(false);
        setActiveNode(-1);
        setNodes(linkedListToArray(list));
        toast.success(`${operation === 'insert' ? 'Insertion' : 'Deletion'} completed!`);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepRef.current > 0) {
      setIsPaused(true);
      currentStepRef.current--;
      
      const step = operationStepsRef.current[currentStepRef.current];
      setNodes(step.nodes);
      setActiveNode(step.active);
    }
  };

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-medium mb-2">Linked List Visualization</h2>
            <p className="text-muted-foreground">Visualize linked list operations</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button onClick={initializeList} disabled={isRunning}>
              Reset List
            </Button>
          </div>
        </div>
        
        <div className="mb-8 relative overflow-hidden">
          <div className="flex flex-wrap justify-center items-center gap-2 p-8">
            {nodes.map((value, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`node h-16 w-16 ${index === activeNode ? 'node-active' : 'node-default'}`}
                >
                  <div className="text-lg font-medium">{value}</div>
                </div>
                
                {index < nodes.length - 1 && (
                  <div className="flex items-center h-16">
                    <div className="w-8 h-0.5 bg-muted-foreground relative">
                      <div className="absolute -right-3 -top-1 w-0 h-0 border-t-4 border-r-4 border-b-4 border-t-transparent border-r-muted-foreground border-b-transparent"></div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
            
            {nodes.length === 0 && (
              <div className="text-muted-foreground">Empty List</div>
            )}
          </div>
        </div>
        
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Select
              value={operation}
              onValueChange={setOperation}
              disabled={isRunning}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select operation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="insert">Insert Node</SelectItem>
                <SelectItem value="delete">Delete Node</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {operation === 'insert' && (
            <>
              <Input
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isRunning}
              />
              
              <Input
                type="number"
                placeholder="Enter position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                min={0}
                max={nodes.length}
                disabled={isRunning}
              />
            </>
          )}
          
          {operation === 'delete' && (
            <Input
              type="number"
              placeholder="Enter position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              min={0}
              max={nodes.length - 1}
              disabled={isRunning}
              className="col-span-2"
            />
          )}
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

export default LinkedListVisualizer;
