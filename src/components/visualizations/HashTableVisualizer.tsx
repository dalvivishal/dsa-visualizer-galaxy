
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VisualizerControls from '@/components/ui/VisualizerControls';
import { toast } from 'sonner';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface HashTableEntry {
  key: string;
  value: string;
}

type HashTable = Array<HashTableEntry[]>;

interface HashTableVisualizerProps {
  className?: string;
}

const HashTableVisualizer: React.FC<HashTableVisualizerProps> = ({ className }) => {
  const [hashTable, setHashTable] = useState<HashTable>(Array(7).fill(null).map(() => []));
  const [keyInput, setKeyInput] = useState<string>('');
  const [valueInput, setValueInput] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  
  const animationRef = useRef<number | null>(null);
  const operationStepsRef = useRef<Array<{ hashTable: HashTable, active: number }>>([]); 
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

  const hashFunction = (key: string): number => {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash + key.charCodeAt(i)) % hashTable.length;
    }
    return hash;
  };

  const handleInsert = () => {
    if (!keyInput.trim()) {
      toast.error("Please enter a key");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    const hash = hashFunction(keyInput);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight the bucket
    const tableCopy1 = hashTable.map(bucket => [...bucket]);
    steps.push({ hashTable: tableCopy1, active: hash });
    
    // Step 2: Add the new entry
    const tableCopy2 = hashTable.map(bucket => [...bucket]);
    const entryIndex = tableCopy2[hash].findIndex(entry => entry.key === keyInput);
    
    if (entryIndex >= 0) {
      // Update existing entry
      tableCopy2[hash][entryIndex] = { key: keyInput, value: valueInput };
    } else {
      // Add new entry
      tableCopy2[hash].push({ key: keyInput, value: valueInput });
    }
    
    steps.push({ hashTable: tableCopy2, active: hash });
    
    // Final step: No highlights
    steps.push({ hashTable: tableCopy2, active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const handleSearch = () => {
    if (!keyInput.trim()) {
      toast.error("Please enter a key to search");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    const hash = hashFunction(keyInput);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight the bucket
    steps.push({ hashTable: [...hashTable], active: hash });
    
    // Find the entry
    const entryIndex = hashTable[hash].findIndex(entry => entry.key === keyInput);
    
    if (entryIndex >= 0) {
      // Found entry
      setValueInput(hashTable[hash][entryIndex].value);
      toast.success(`Found value: ${hashTable[hash][entryIndex].value}`);
    } else {
      // Not found
      toast.error(`Key '${keyInput}' not found`);
    }
    
    // Final step: No highlights
    steps.push({ hashTable: [...hashTable], active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const handleDelete = () => {
    if (!keyInput.trim()) {
      toast.error("Please enter a key to delete");
      return;
    }
    
    resetState();
    setIsRunning(true);
    
    const hash = hashFunction(keyInput);
    
    // Create animation steps
    const steps = [];
    
    // Step 1: Highlight the bucket
    steps.push({ hashTable: [...hashTable], active: hash });
    
    // Step 2: Delete the entry
    const tableCopy = hashTable.map(bucket => [...bucket]);
    const entryIndex = tableCopy[hash].findIndex(entry => entry.key === keyInput);
    
    if (entryIndex >= 0) {
      // Delete entry
      tableCopy[hash].splice(entryIndex, 1);
      steps.push({ hashTable: tableCopy, active: hash });
      toast.success(`Deleted key: ${keyInput}`);
    } else {
      // Not found
      toast.error(`Key '${keyInput}' not found`);
    }
    
    // Final step: No highlights
    steps.push({ hashTable: tableCopy, active: -1 });
    
    operationStepsRef.current = steps;
    startAnimation();
  };

  const startAnimation = () => {
    if (currentStepRef.current >= operationStepsRef.current.length) {
      setIsRunning(false);
      setActiveIndex(-1);
      setHashTable(operationStepsRef.current[operationStepsRef.current.length - 1].hashTable);
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 300;
    
    const step = operationStepsRef.current[currentStepRef.current];
    setHashTable(step.hashTable);
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
    // Initialize with some values
    const initialTable: HashTable = Array(7).fill(null).map(() => []);
    const initialData = [
      { key: "name", value: "John" },
      { key: "age", value: "30" },
      { key: "city", value: "New York" },
      { key: "job", value: "Engineer" }
    ];
    
    initialData.forEach(({ key, value }) => {
      const hash = hashFunction(key);
      initialTable[hash].push({ key, value });
    });
    
    setHashTable(initialTable);
    setKeyInput('');
    setValueInput('');
    toast.info("Hash table reset");
  };

  const handleStepForward = () => {
    if (currentStepRef.current < operationStepsRef.current.length) {
      setIsPaused(true);
      
      const step = operationStepsRef.current[currentStepRef.current];
      setHashTable(step.hashTable);
      setActiveIndex(step.active);
      
      currentStepRef.current++;
      
      if (currentStepRef.current >= operationStepsRef.current.length) {
        setIsRunning(false);
        setActiveIndex(-1);
      }
    }
  };

  const handleStepBackward = () => {
    if (currentStepRef.current > 0) {
      setIsPaused(true);
      currentStepRef.current--;
      
      const step = operationStepsRef.current[currentStepRef.current];
      setHashTable(step.hashTable);
      setActiveIndex(step.active);
    }
  };

  // Initialize hash table with some values on first render
  React.useEffect(() => {
    handleReset();
  }, []);

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6">
          <h2 className="text-2xl font-medium mb-2">Hash Table Visualization</h2>
          <p className="text-muted-foreground">Visualize key-value storage with hash function</p>
        </div>
        
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-2">
            {hashTable.map((bucket, index) => (
              <div 
                key={index}
                className={`p-3 border rounded-md ${
                  index === activeIndex ? 'border-primary bg-primary/10' : 'border-border bg-muted/30'
                }`}
              >
                <div className="flex items-center mb-1">
                  <span className="text-sm font-medium mr-2">Bucket {index}:</span>
                  <span className="text-xs text-muted-foreground">(hash value = {index})</span>
                </div>
                
                {bucket.length === 0 ? (
                  <div className="text-xs text-muted-foreground italic">Empty</div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {bucket.map((entry, entryIndex) => (
                      <div 
                        key={entryIndex} 
                        className="bg-background rounded p-2 text-sm flex items-center"
                      >
                        <span className="font-medium">{entry.key}:</span>
                        <span className="ml-1">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-3 sm:col-span-1">
            <Input
              placeholder="Key"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              disabled={isRunning}
              className="mb-2"
            />
            <Input
              placeholder="Value"
              value={valueInput}
              onChange={(e) => setValueInput(e.target.value)}
              disabled={isRunning || !keyInput.trim()}
            />
          </div>
          
          <div className="col-span-3 sm:col-span-2 grid grid-cols-3 gap-2">
            <Button 
              onClick={handleInsert} 
              disabled={isRunning || !keyInput.trim()}
              className="col-span-1"
            >
              Insert
            </Button>
            
            <Button 
              onClick={handleSearch} 
              disabled={isRunning || !keyInput.trim()}
              variant="secondary"
              className="col-span-1"
            >
              Search
            </Button>
            
            <Button 
              onClick={handleDelete} 
              disabled={isRunning || !keyInput.trim()}
              variant="destructive"
              className="col-span-1"
            >
              Delete
            </Button>
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

export default HashTableVisualizer;
