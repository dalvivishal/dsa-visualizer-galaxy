
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Card } from '@/components/ui/card';
import VisualizerControls from '@/components/ui/VisualizerControls';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { generateRandomArray } from '@/utils/algorithmUtils';
import { toast } from 'sonner';

const SearchVisualizer = () => {
  const [array, setArray] = useState<number[]>([]);
  const [arraySize, setArraySize] = useState<number>(10);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [targetValue, setTargetValue] = useState<number | null>(null);
  const [foundIndex, setFoundIndex] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [algorithm, setAlgorithm] = useState<'linear' | 'binary'>('linear');
  const [searchSteps, setSearchSteps] = useState<{indices: number[], low?: number, high?: number}[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  useEffect(() => {
    generateNewArray();
  }, [arraySize]);
  
  const generateNewArray = () => {
    let newArray = generateRandomArray(arraySize, 1, 100);
    if (algorithm === 'binary') {
      // For binary search, we need a sorted array
      newArray.sort((a, b) => a - b);
    }
    setArray(newArray);
    resetState();
  };
  
  const resetState = () => {
    setCurrentIndex(-1);
    setFoundIndex(null);
    setTargetValue(null);
    setIsRunning(false);
    setIsPaused(false);
    setSearchSteps([]);
    setCurrentStep(0);
  };
  
  const linearSearch = (arr: number[], target: number) => {
    const steps: {indices: number[]}[] = [];
    
    for (let i = 0; i < arr.length; i++) {
      steps.push({ indices: [i] });
      if (arr[i] === target) {
        return { steps, foundIndex: i };
      }
    }
    
    return { steps, foundIndex: -1 };
  };
  
  const binarySearch = (arr: number[], target: number) => {
    const steps: {indices: number[], low: number, high: number}[] = [];
    let low = 0;
    let high = arr.length - 1;
    
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      steps.push({ indices: [mid], low, high });
      
      if (arr[mid] === target) {
        return { steps, foundIndex: mid };
      }
      
      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    
    return { steps, foundIndex: -1 };
  };
  
  const startSearch = () => {
    if (!targetValue) {
      // Pick a random value from the array
      const randomIndex = Math.floor(Math.random() * array.length);
      setTargetValue(array[randomIndex]);
      
      const result = algorithm === 'linear' 
        ? linearSearch(array, array[randomIndex])
        : binarySearch(array, array[randomIndex]);
      
      setSearchSteps(result.steps);
      setFoundIndex(result.foundIndex);
    } else {
      const result = algorithm === 'linear' 
        ? linearSearch(array, targetValue)
        : binarySearch(array, targetValue);
      
      setSearchSteps(result.steps);
      setFoundIndex(result.foundIndex);
    }
    
    setIsRunning(true);
    setCurrentStep(0);
  };
  
  useEffect(() => {
    if (isRunning && !isPaused && currentStep < searchSteps.length) {
      const timer = setTimeout(() => {
        if (currentStep < searchSteps.length) {
          const step = searchSteps[currentStep];
          setCurrentIndex(step.indices[0]);
          setCurrentStep(prevStep => prevStep + 1);
        } else {
          setIsRunning(false);
          if (foundIndex !== -1) {
            toast.success(`Found ${targetValue} at index ${foundIndex}!`);
          } else {
            toast.error(`${targetValue} not found in the array.`);
          }
        }
      }, 1000 / speed);
      
      return () => clearTimeout(timer);
    } else if (currentStep >= searchSteps.length && isRunning) {
      setIsRunning(false);
      if (foundIndex !== -1) {
        toast.success(`Found ${targetValue} at index ${foundIndex}!`);
      } else {
        toast.error(`${targetValue} not found in the array.`);
      }
    }
  }, [currentStep, isRunning, isPaused, searchSteps, speed, foundIndex, targetValue]);
  
  const handlePlay = () => {
    if (!isRunning) {
      startSearch();
    } else {
      setIsPaused(false);
    }
  };
  
  const handlePause = () => {
    setIsPaused(true);
  };
  
  const handleReset = () => {
    resetState();
  };
  
  const handleStepForward = () => {
    if (currentStep < searchSteps.length) {
      const step = searchSteps[currentStep];
      setCurrentIndex(step.indices[0]);
      setCurrentStep(prevStep => prevStep + 1);
      setIsPaused(true);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 1) {
      const step = searchSteps[currentStep - 2];
      setCurrentIndex(step.indices[0]);
      setCurrentStep(prevStep => prevStep - 1);
      setIsPaused(true);
    }
  };
  
  const getBarColor = (index: number) => {
    if (index === currentIndex) return 'bg-primary';
    if (algorithm === 'binary' && searchSteps[currentStep - 1]) {
      const { low, high } = searchSteps[currentStep - 1];
      if (low !== undefined && high !== undefined && index >= low && index <= high) {
        return 'bg-accent opacity-60';
      }
    }
    if (index === foundIndex && currentStep === searchSteps.length) return 'bg-green-500';
    return 'bg-secondary';
  };
  
  return (
    <Card className="p-6 glass-card">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-medium mb-2">Search Algorithms</h2>
          <p className="text-muted-foreground">Visualize linear and binary search operations</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={algorithm === 'linear' ? 'default' : 'outline'} 
            onClick={() => {
              setAlgorithm('linear');
              resetState();
              generateNewArray();
            }}
            disabled={isRunning}
          >
            Linear Search
          </Button>
          <Button 
            variant={algorithm === 'binary' ? 'default' : 'outline'} 
            onClick={() => {
              setAlgorithm('binary');
              resetState();
              // Generate a sorted array for binary search
              const newArray = generateRandomArray(arraySize, 1, 100).sort((a, b) => a - b);
              setArray(newArray);
            }}
            disabled={isRunning}
          >
            Binary Search
          </Button>
          <Button onClick={generateNewArray} disabled={isRunning}>
            New Array
          </Button>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Array Size: {arraySize}</span>
          <div className="w-1/2">
            <Slider
              value={[arraySize]}
              min={5}
              max={20}
              step={5}
              onValueChange={(value) => {
                if (!isRunning) setArraySize(value[0]);
              }}
              disabled={isRunning}
            />
          </div>
        </div>
        
        {targetValue && (
          <div className="mb-2 text-center font-medium">
            Searching for: {targetValue}
          </div>
        )}
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
                  transform: index === currentIndex ? 'translateY(-10px)' : 'translateY(0)',
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
  );
};

const Search = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-pink-500">
            Search Algorithms
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize how different search algorithms find values in a dataset.
          </p>
        </AnimatedCard>
        
        <AnimatedCard delay={100} className="mb-8">
          <SearchVisualizer />
        </AnimatedCard>
        
        <AnimatedCard delay={200} className="mb-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Algorithm Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Linear Search</h3>
                <p className="text-muted-foreground mb-2">
                  Checks each element sequentially until the target is found or the array ends.
                </p>
                <ul className="list-disc list-inside text-sm">
                  <li>Time Complexity: O(n)</li>
                  <li>Space Complexity: O(1)</li>
                  <li>Works on both sorted and unsorted arrays</li>
                </ul>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Binary Search</h3>
                <p className="text-muted-foreground mb-2">
                  Divides the search interval in half repeatedly to efficiently locate the target.
                </p>
                <ul className="list-disc list-inside text-sm">
                  <li>Time Complexity: O(log n)</li>
                  <li>Space Complexity: O(1)</li>
                  <li>Requires a sorted array</li>
                </ul>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </Layout>
  );
};

export default Search;
