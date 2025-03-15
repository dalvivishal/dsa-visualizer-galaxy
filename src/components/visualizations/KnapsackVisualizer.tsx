
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VisualizerControls from '@/components/ui/VisualizerControls';
import { toast } from 'sonner';

interface Item {
  id: number;
  name: string;
  weight: number;
  value: number;
}

interface TableCell {
  value: number;
  included: boolean;
  highlighted: boolean;
}

const KnapsackVisualizer = () => {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Laptop", weight: 3, value: 10 },
    { id: 2, name: "Phone", weight: 1, value: 6 },
    { id: 3, name: "Camera", weight: 2, value: 8 },
    { id: 4, name: "Watch", weight: 1, value: 4 }
  ]);
  const [capacity, setCapacity] = useState<number>(5);
  const [dpTable, setDpTable] = useState<TableCell[][]>([]);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  
  const [speed, setSpeed] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const stepsRef = useRef<Array<{
    table: TableCell[][],
    selectedItems: Item[],
    description: string
  }>>([]);
  
  const animationRef = useRef<number | null>(null);
  
  // Initialize DP table
  useEffect(() => {
    initializeTable();
  }, [items, capacity]);
  
  const initializeTable = () => {
    const rows = items.length + 1;
    const cols = capacity + 1;
    
    // Create empty table
    const newTable: TableCell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({ 
        value: 0,
        included: false,
        highlighted: false
      }))
    );
    
    setDpTable(newTable);
    setSelectedItems([]);
    
    // Reset animation state
    resetAnimationState();
  };
  
  const resetAnimationState = () => {
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentStep(0);
    stepsRef.current = [];
    
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
  };
  
  const solveKnapsack = () => {
    resetAnimationState();
    
    const rows = items.length + 1;
    const cols = capacity + 1;
    const steps: typeof stepsRef.current = [];
    
    // Initial state
    const initialTable: TableCell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({ 
        value: 0,
        included: false,
        highlighted: false
      }))
    );
    
    steps.push({
      table: JSON.parse(JSON.stringify(initialTable)),
      selectedItems: [],
      description: "Starting with an empty DP table. Each cell [i,w] will represent the maximum value possible using items 1...i with weight capacity w."
    });
    
    // Fill the DP table
    for (let i = 1; i < rows; i++) {
      for (let w = 0; w < cols; w++) {
        // Get current item (subtract 1 as our items are 0-indexed but table is 1-indexed)
        const item = items[i - 1];
        
        // Highlight current item and current weight
        const highlightStep = JSON.parse(JSON.stringify(steps[steps.length - 1].table));
        
        // Highlight row label and column label
        highlightStep[i][0].highlighted = true;
        highlightStep[0][w].highlighted = true;
        
        steps.push({
          table: highlightStep,
          selectedItems: [],
          description: `Considering item ${item.name} (weight: ${item.weight}, value: ${item.value}) with capacity ${w}.`
        });
        
        // If item is too heavy for current capacity
        if (item.weight > w) {
          // Just take value from the item above
          initialTable[i][w].value = initialTable[i-1][w].value;
          
          const noFitStep = JSON.parse(JSON.stringify(initialTable));
          noFitStep[i-1][w].highlighted = true;
          noFitStep[i][w].highlighted = true;
          
          steps.push({
            table: noFitStep,
            selectedItems: [],
            description: `Item ${item.name} is too heavy (weight ${item.weight}) for capacity ${w}. Taking value ${initialTable[i-1][w].value} from above.`
          });
        } else {
          // Max of (exclude current item) vs (include current item + best value with remaining weight)
          const valueIfExcluded = initialTable[i-1][w].value;
          const valueIfIncluded = item.value + initialTable[i-1][w-item.weight].value;
          
          const choiceStep = JSON.parse(JSON.stringify(initialTable));
          choiceStep[i-1][w].highlighted = true;
          choiceStep[i-1][w-item.weight].highlighted = true;
          
          steps.push({
            table: choiceStep,
            selectedItems: [],
            description: `Comparing: Exclude item (${valueIfExcluded}) vs Include item (${item.value} + ${initialTable[i-1][w-item.weight].value} = ${valueIfIncluded})`
          });
          
          if (valueIfIncluded > valueIfExcluded) {
            initialTable[i][w].value = valueIfIncluded;
            initialTable[i][w].included = true;
            
            const includeStep = JSON.parse(JSON.stringify(initialTable));
            includeStep[i][w].highlighted = true;
            
            steps.push({
              table: includeStep,
              selectedItems: [],
              description: `Including item ${item.name} gives better value (${valueIfIncluded}). Mark cell as "included".`
            });
          } else {
            initialTable[i][w].value = valueIfExcluded;
            
            const excludeStep = JSON.parse(JSON.stringify(initialTable));
            excludeStep[i][w].highlighted = true;
            
            steps.push({
              table: excludeStep,
              selectedItems: [],
              description: `Excluding item ${item.name} gives better value (${valueIfExcluded}).`
            });
          }
        }
        
        // Clear highlights
        const clearStep = JSON.parse(JSON.stringify(initialTable));
        steps.push({
          table: clearStep,
          selectedItems: [],
          description: "Moving to next cell."
        });
      }
    }
    
    // Trace back to find selected items
    let i = rows - 1;
    let w = cols - 1;
    const selected: Item[] = [];
    
    const finalTable = JSON.parse(JSON.stringify(initialTable));
    finalTable[i][w].highlighted = true;
    
    steps.push({
      table: finalTable,
      selectedItems: [],
      description: `Optimal solution has value ${initialTable[i][w].value}. Now backtracking to find which items are included.`
    });
    
    while (i > 0 && w > 0) {
      if (initialTable[i][w].included) {
        const item = items[i - 1];
        selected.push(item);
        
        const includeStep = JSON.parse(JSON.stringify(initialTable));
        includeStep[i][w].highlighted = true;
        
        steps.push({
          table: includeStep,
          selectedItems: [...selected],
          description: `Item ${item.name} is included in the optimal solution.`
        });
        
        w = w - item.weight;
      }
      
      i = i - 1;
      
      const nextCellStep = JSON.parse(JSON.stringify(initialTable));
      if (i >= 0 && w >= 0) {
        nextCellStep[i][w].highlighted = true;
      }
      
      steps.push({
        table: nextCellStep,
        selectedItems: [...selected],
        description: "Moving to next cell in backtrack."
      });
    }
    
    // Final step
    steps.push({
      table: JSON.parse(JSON.stringify(initialTable)),
      selectedItems: [...selected],
      description: `Solution found! Total value: ${initialTable[items.length][capacity].value}, Total weight: ${selected.reduce((sum, item) => sum + item.weight, 0)}`
    });
    
    // Save steps
    stepsRef.current = steps;
    setDpTable(initialTable);
    setSelectedItems(selected);
    
    // Start animation
    setCurrentStep(0);
    setIsPlaying(true);
    playAnimation();
  };
  
  const playAnimation = () => {
    if (currentStep >= stepsRef.current.length) {
      setIsPlaying(false);
      return;
    }
    
    const currentStepData = stepsRef.current[currentStep];
    setDpTable(currentStepData.table);
    setSelectedItems(currentStepData.selectedItems);
    
    const speedFactor = 11 - speed; // Invert the speed
    const delayMs = speedFactor * 300;
    
    setCurrentStep(prevStep => prevStep + 1);
    
    animationRef.current = window.setTimeout(() => {
      if (isPlaying && !isPaused) {
        playAnimation();
      }
    }, delayMs);
  };
  
  const handlePlay = () => {
    if (stepsRef.current.length === 0) {
      solveKnapsack();
    } else {
      setIsPlaying(true);
      setIsPaused(false);
      playAnimation();
    }
  };
  
  const handlePause = () => {
    setIsPaused(true);
    setIsPlaying(false);
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
  };
  
  const handleReset = () => {
    resetAnimationState();
    initializeTable();
  };
  
  const handleStepForward = () => {
    if (stepsRef.current.length === 0) {
      solveKnapsack();
      return;
    }
    
    if (currentStep < stepsRef.current.length) {
      const currentStepData = stepsRef.current[currentStep];
      setDpTable(currentStepData.table);
      setSelectedItems(currentStepData.selectedItems);
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 1) {
      const prevStepData = stepsRef.current[currentStep - 2];
      setDpTable(prevStepData.table);
      setSelectedItems(prevStepData.selectedItems);
      setCurrentStep(currentStep - 1);
    }
  };
  
  const getCurrentDescription = () => {
    if (stepsRef.current.length === 0 || currentStep === 0) {
      return "Initialize the knapsack problem and press 'Play' to solve.";
    }
    return stepsRef.current[Math.min(currentStep - 1, stepsRef.current.length - 1)].description;
  };
  
  return (
    <Card className="p-6 glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">0/1 Knapsack Problem</h2>
        <p className="text-muted-foreground">Visualizing how to select items to maximize value while staying within a weight limit</p>
      </div>
      
      <div className="mb-6">
        <div className="bg-muted/50 p-4 rounded-lg mb-4">
          <h3 className="text-lg font-medium mb-2">Items</h3>
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="font-semibold">Name</div>
            <div className="font-semibold">Weight</div>
            <div className="font-semibold">Value</div>
            <div className="font-semibold">Selected</div>
            
            {items.map(item => (
              <React.Fragment key={item.id}>
                <div>{item.name}</div>
                <div>{item.weight}</div>
                <div>{item.value}</div>
                <div>{selectedItems.some(i => i.id === item.id) ? "✓" : ""}</div>
              </React.Fragment>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <span className="font-semibold mr-2">Knapsack Capacity:</span>
              <span>{capacity}</span>
            </div>
            {selectedItems.length > 0 && (
              <>
                <div>
                  <span className="font-semibold mr-2">Total Weight:</span>
                  <span>{selectedItems.reduce((sum, item) => sum + item.weight, 0)}</span>
                </div>
                <div>
                  <span className="font-semibold mr-2">Total Value:</span>
                  <span>{selectedItems.reduce((sum, item) => sum + item.value, 0)}</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border border-border bg-muted text-center w-24">Items / Weight</th>
                {Array.from({ length: capacity + 1 }, (_, i) => (
                  <th key={i} className={`p-2 border border-border text-center w-16 ${dpTable[0]?.[i]?.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dpTable.map((row, i) => (
                <tr key={i}>
                  <td className={`p-2 border border-border text-center font-medium ${i > 0 && dpTable[i]?.[0]?.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {i === 0 ? '' : items[i-1].name}
                  </td>
                  {row.map((cell, j) => (
                    <td key={j} className={`p-2 border border-border text-center ${cell.highlighted ? 'bg-primary text-primary-foreground' : cell.included ? 'bg-green-100' : 'bg-background'}`}>
                      {cell.value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-muted/20 p-4 rounded-md mb-4">
          <p className="text-sm">{getCurrentDescription()}</p>
        </div>
      </div>
      
      <VisualizerControls
        isPlaying={isPlaying && !isPaused}
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

export default KnapsackVisualizer;
