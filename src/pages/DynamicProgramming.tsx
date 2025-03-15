
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import VisualizerControls from '@/components/ui/VisualizerControls';

const FibonacciVisualizer = () => {
  const [n, setN] = useState(6);
  const [speed, setSpeed] = useState(5);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [fibValues, setFibValues] = useState<{[key: number]: number}>({});
  const [callStack, setCallStack] = useState<number[]>([]);
  
  const generateFibonacciSteps = () => {
    const steps: Array<{
      n: number, 
      fibValues: {[key: number]: number}, 
      callStack: number[]
    }> = [];
    
    const fibonacciWithSteps = (n: number, values: {[key: number]: number} = {}, stack: number[] = []) => {
      stack.push(n);
      steps.push({ n, fibValues: { ...values }, callStack: [...stack] });
      
      if (n <= 1) {
        values[n] = n;
        steps.push({ n, fibValues: { ...values }, callStack: [...stack] });
        stack.pop();
        return n;
      }
      
      if (values[n] !== undefined) {
        steps.push({ n, fibValues: { ...values }, callStack: [...stack] });
        stack.pop();
        return values[n];
      }
      
      const fib1 = fibonacciWithSteps(n - 1, values, stack);
      const fib2 = fibonacciWithSteps(n - 2, values, stack);
      
      values[n] = fib1 + fib2;
      steps.push({ n, fibValues: { ...values }, callStack: [...stack] });
      stack.pop();
      
      return values[n];
    };
    
    fibonacciWithSteps(n);
    return steps;
  };
  
  const [steps, setSteps] = useState(() => generateFibonacciSteps());
  
  const handlePlay = () => {
    setIsPlaying(true);
    playAnimation();
  };
  
  const playAnimation = () => {
    if (currentStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => {
          const newStep = prev + 1;
          const stepData = steps[newStep];
          setFibValues(stepData.fibValues);
          setCallStack(stepData.callStack);
          return newStep;
        });
        if (isPlaying) playAnimation();
      }, 1000 / speed);
      
      return () => clearTimeout(timer);
    } else {
      setIsPlaying(false);
    }
  };
  
  const handlePause = () => {
    setIsPlaying(false);
  };
  
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    const initialStep = steps[0];
    setFibValues(initialStep.fibValues);
    setCallStack(initialStep.callStack);
  };
  
  const handleStepForward = () => {
    if (currentStep < steps.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      const stepData = steps[newStep];
      setFibValues(stepData.fibValues);
      setCallStack(stepData.callStack);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      const stepData = steps[newStep];
      setFibValues(stepData.fibValues);
      setCallStack(stepData.callStack);
    }
  };
  
  const handleChangeN = (newN: number) => {
    setN(newN);
    setSteps(generateFibonacciSteps());
    handleReset();
  };
  
  return (
    <Card className="p-6 glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Fibonacci Sequence</h2>
        <p className="text-muted-foreground">Visualizing how dynamic programming optimizes the Fibonacci sequence calculation</p>
      </div>
      
      <div className="mb-6 flex justify-center">
        <div className="bg-muted p-4 rounded-lg inline-block">
          <div className="text-center mb-4">
            <span className="text-xl font-medium">Computing Fibonacci({n})</span>
          </div>
          
          <div className="flex gap-6 mb-6">
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Call Stack</h3>
              <div className="flex flex-col-reverse">
                {callStack.map((val, index) => (
                  <div 
                    key={index} 
                    className="p-2 mb-1 border border-border rounded-md bg-background"
                  >
                    fib({val})
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border border-border rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">Memoization Table</h3>
              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: n + 1 }, (_, i) => (
                  <div 
                    key={i} 
                    className={`p-2 border border-border rounded-md text-center ${
                      fibValues[i] !== undefined ? 'bg-primary text-primary-foreground' : 'bg-background'
                    }`}
                  >
                    {i}: {fibValues[i] !== undefined ? fibValues[i] : '-'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6 flex gap-2 justify-center">
        {[3, 5, 6, 8, 10].map((num) => (
          <Button 
            key={num} 
            variant={n === num ? "default" : "outline"}
            onClick={() => handleChangeN(num)}
            disabled={isPlaying}
          >
            n = {num}
          </Button>
        ))}
      </div>
      
      <VisualizerControls
        isPlaying={isPlaying}
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

const DynamicProgramming = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
            Dynamic Programming
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize how dynamic programming solves complex problems by breaking them into simpler subproblems.
          </p>
        </AnimatedCard>
        
        <AnimatedCard delay={100} className="mb-8">
          <Tabs defaultValue="fibonacci">
            <TabsList className="mb-4">
              <TabsTrigger value="fibonacci">Fibonacci</TabsTrigger>
              <TabsTrigger value="knapsack" disabled>Knapsack (Coming Soon)</TabsTrigger>
              <TabsTrigger value="lcs" disabled>Longest Common Subsequence (Coming Soon)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fibonacci">
              <FibonacciVisualizer />
            </TabsContent>
          </Tabs>
        </AnimatedCard>
        
        <AnimatedCard delay={200} className="mb-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">What is Dynamic Programming?</h2>
            <p className="mb-4">
              Dynamic Programming (DP) is a technique for solving complex problems by breaking them down into simpler subproblems. 
              It is applicable when subproblems overlap and have optimal substructure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Memoization (Top-down)</h3>
                <p className="text-muted-foreground">
                  Solve the problem recursively and cache the results of subproblems to avoid redundant calculations.
                </p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Tabulation (Bottom-up)</h3>
                <p className="text-muted-foreground">
                  Build a table of solutions to subproblems iteratively, starting from the smallest subproblems.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </Layout>
  );
};

export default DynamicProgramming;
