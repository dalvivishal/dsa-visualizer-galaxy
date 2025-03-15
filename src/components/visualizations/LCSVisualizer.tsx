
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VisualizerControls from '@/components/ui/VisualizerControls';
import { toast } from 'sonner';

interface TableCell {
  value: number;
  direction: 'diagonal' | 'up' | 'left' | null;
  highlighted: boolean;
}

const LCSVisualizer = () => {
  const [string1, setString1] = useState<string>("AGCAT");
  const [string2, setString2] = useState<string>("GAC");
  const [dpTable, setDpTable] = useState<TableCell[][]>([]);
  const [lcs, setLcs] = useState<string>("");
  
  const [speed, setSpeed] = useState<number>(5);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  
  const stepsRef = useRef<Array<{
    table: TableCell[][],
    lcs: string,
    description: string
  }>>([]);
  
  const animationRef = useRef<number | null>(null);
  
  // Initialize DP table
  useEffect(() => {
    initializeTable();
  }, [string1, string2]);
  
  const initializeTable = () => {
    const rows = string1.length + 1;
    const cols = string2.length + 1;
    
    // Create empty table
    const newTable: TableCell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({ 
        value: 0,
        direction: null,
        highlighted: false
      }))
    );
    
    setDpTable(newTable);
    setLcs("");
    
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
  
  const solveLCS = () => {
    resetAnimationState();
    
    const rows = string1.length + 1;
    const cols = string2.length + 1;
    const steps: typeof stepsRef.current = [];
    
    // Initial state
    const initialTable: TableCell[][] = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => ({ 
        value: 0,
        direction: null,
        highlighted: false
      }))
    );
    
    steps.push({
      table: JSON.parse(JSON.stringify(initialTable)),
      lcs: "",
      description: "Starting with an empty DP table. Each cell [i,j] will represent the length of the LCS between prefixes of our strings."
    });
    
    // Fill the DP table
    for (let i = 1; i < rows; i++) {
      for (let j = 1; j < cols; j++) {
        // Highlight current cell
        const highlightStep = JSON.parse(JSON.stringify(steps[steps.length - 1].table));
        
        // Highlight row and column headers
        highlightStep[i][0].highlighted = true;
        highlightStep[0][j].highlighted = true;
        
        steps.push({
          table: highlightStep,
          lcs: "",
          description: `Comparing character ${string1[i-1]} at position ${i} of string1 with character ${string2[j-1]} at position ${j} of string2.`
        });
        
        if (string1[i - 1] === string2[j - 1]) {
          // Characters match - take diagonal value + 1
          initialTable[i][j].value = initialTable[i-1][j-1].value + 1;
          initialTable[i][j].direction = 'diagonal';
          
          const matchStep = JSON.parse(JSON.stringify(initialTable));
          matchStep[i][j].highlighted = true;
          matchStep[i-1][j-1].highlighted = true;
          
          steps.push({
            table: matchStep,
            lcs: "",
            description: `Characters match! (${string1[i-1]}). Adding 1 to diagonal value (${initialTable[i-1][j-1].value}) to get ${initialTable[i][j].value}.`
          });
        } else {
          // Characters don't match - take max of left or up
          const valueFromLeft = initialTable[i][j-1].value;
          const valueFromUp = initialTable[i-1][j].value;
          
          const compareStep = JSON.parse(JSON.stringify(initialTable));
          compareStep[i][j-1].highlighted = true;
          compareStep[i-1][j].highlighted = true;
          
          steps.push({
            table: compareStep,
            lcs: "",
            description: `Characters don't match. Comparing value from left (${valueFromLeft}) vs. from above (${valueFromUp}).`
          });
          
          if (valueFromUp > valueFromLeft) {
            initialTable[i][j].value = valueFromUp;
            initialTable[i][j].direction = 'up';
            
            const upStep = JSON.parse(JSON.stringify(initialTable));
            upStep[i][j].highlighted = true;
            
            steps.push({
              table: upStep,
              lcs: "",
              description: `Taking value from above (${valueFromUp}) and setting direction to "up".`
            });
          } else {
            initialTable[i][j].value = valueFromLeft;
            initialTable[i][j].direction = 'left';
            
            const leftStep = JSON.parse(JSON.stringify(initialTable));
            leftStep[i][j].highlighted = true;
            
            steps.push({
              table: leftStep,
              lcs: "",
              description: `Taking value from left (${valueFromLeft}) and setting direction to "left".`
            });
          }
        }
        
        // Clear highlights
        const clearStep = JSON.parse(JSON.stringify(initialTable));
        steps.push({
          table: clearStep,
          lcs: "",
          description: "Moving to next cell."
        });
      }
    }
    
    // Trace back to find LCS
    let i = rows - 1;
    let j = cols - 1;
    let result = "";
    
    const finalTable = JSON.parse(JSON.stringify(initialTable));
    finalTable[i][j].highlighted = true;
    
    steps.push({
      table: finalTable,
      lcs: result,
      description: `LCS length is ${initialTable[i][j].value}. Now backtracking to find the actual subsequence.`
    });
    
    while (i > 0 && j > 0) {
      if (initialTable[i][j].direction === 'diagonal') {
        result = string1[i-1] + result;
        
        const diagonalStep = JSON.parse(JSON.stringify(initialTable));
        diagonalStep[i][j].highlighted = true;
        
        steps.push({
          table: diagonalStep,
          lcs: result,
          description: `Found matching character ${string1[i-1]} (direction: diagonal). Adding to LCS: "${result}"`
        });
        
        i--;
        j--;
      } else if (initialTable[i][j].direction === 'up') {
        i--;
        
        const upStep = JSON.parse(JSON.stringify(initialTable));
        if (i >= 0) upStep[i][j].highlighted = true;
        
        steps.push({
          table: upStep,
          lcs: result,
          description: "Following direction 'up'."
        });
      } else {
        j--;
        
        const leftStep = JSON.parse(JSON.stringify(initialTable));
        if (j >= 0) leftStep[i][j].highlighted = true;
        
        steps.push({
          table: leftStep,
          lcs: result,
          description: "Following direction 'left'."
        });
      }
    }
    
    // Final step
    steps.push({
      table: JSON.parse(JSON.stringify(initialTable)),
      lcs: result,
      description: `Longest Common Subsequence: "${result}" with length ${result.length}`
    });
    
    // Save steps
    stepsRef.current = steps;
    setDpTable(initialTable);
    setLcs(result);
    
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
    setLcs(currentStepData.lcs);
    
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
      solveLCS();
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
      solveLCS();
      return;
    }
    
    if (currentStep < stepsRef.current.length) {
      const currentStepData = stepsRef.current[currentStep];
      setDpTable(currentStepData.table);
      setLcs(currentStepData.lcs);
      setCurrentStep(currentStep + 1);
    }
  };
  
  const handleStepBackward = () => {
    if (currentStep > 1) {
      const prevStepData = stepsRef.current[currentStep - 2];
      setDpTable(prevStepData.table);
      setLcs(prevStepData.lcs);
      setCurrentStep(currentStep - 1);
    }
  };
  
  const getCurrentDescription = () => {
    if (stepsRef.current.length === 0 || currentStep === 0) {
      return "Initialize the LCS problem and press 'Play' to solve.";
    }
    return stepsRef.current[Math.min(currentStep - 1, stepsRef.current.length - 1)].description;
  };
  
  const handleInputChange = () => {
    // Restart visualization
    resetAnimationState();
    initializeTable();
  };
  
  return (
    <Card className="p-6 glass-card">
      <div className="mb-6">
        <h2 className="text-2xl font-medium mb-2">Longest Common Subsequence</h2>
        <p className="text-muted-foreground">Visualizing how to find the longest subsequence common to two strings</p>
      </div>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium">String 1:</label>
            <div className="flex">
              <Input
                value={string1}
                onChange={(e) => {
                  setString1(e.target.value.toUpperCase());
                  handleInputChange();
                }}
                className="uppercase"
                placeholder="Enter string 1"
                maxLength={10}
                disabled={isPlaying}
              />
              <Button 
                variant="outline"
                className="ml-2"
                onClick={() => {
                  setString1("AGCAT");
                  handleInputChange();
                }}
                disabled={isPlaying}
              >
                Reset
              </Button>
            </div>
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">String 2:</label>
            <div className="flex">
              <Input
                value={string2}
                onChange={(e) => {
                  setString2(e.target.value.toUpperCase());
                  handleInputChange();
                }}
                className="uppercase"
                placeholder="Enter string 2"
                maxLength={10}
                disabled={isPlaying}
              />
              <Button 
                variant="outline"
                className="ml-2"
                onClick={() => {
                  setString2("GAC");
                  handleInputChange();
                }}
                disabled={isPlaying}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
        
        {lcs && (
          <div className="bg-muted/50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-medium mb-2">Longest Common Subsequence:</h3>
            <div className="font-mono bg-background p-3 rounded border border-border text-primary text-lg text-center">
              {lcs || "..."}
            </div>
          </div>
        )}
        
        <div className="overflow-x-auto mb-4">
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="p-2 border border-border bg-muted text-center w-16"></th>
                <th className="p-2 border border-border bg-muted text-center w-16"></th>
                {Array.from({ length: string2.length }, (_, i) => (
                  <th key={i} className={`p-2 border border-border text-center w-12 ${dpTable[0]?.[i+1]?.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {string2[i]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-border bg-muted text-center"></td>
                {Array.from({ length: string2.length + 1 }, (_, j) => (
                  <td key={j} className="p-2 border border-border bg-muted text-center">
                    {j}
                  </td>
                ))}
              </tr>
              {string1.split('').map((char, i) => (
                <tr key={i}>
                  <td className={`p-2 border border-border text-center font-medium ${dpTable[i+1]?.[0]?.highlighted ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {char}
                  </td>
                  <td className="p-2 border border-border bg-muted text-center">
                    {i + 1}
                  </td>
                  {Array.from({ length: string2.length + 1 }, (_, j) => j).slice(1).map(j => (
                    <td key={j} className={`p-2 border border-border text-center ${dpTable[i+1]?.[j]?.highlighted ? 'bg-primary text-primary-foreground' : 'bg-background'}`}>
                      <div className="relative">
                        <span>{dpTable[i+1]?.[j]?.value || 0}</span>
                        {dpTable[i+1]?.[j]?.direction && (
                          <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            {dpTable[i+1][j].direction === 'diagonal' && '↖'}
                            {dpTable[i+1][j].direction === 'up' && '↑'}
                            {dpTable[i+1][j].direction === 'left' && '←'}
                          </div>
                        )}
                      </div>
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

export default LCSVisualizer;
