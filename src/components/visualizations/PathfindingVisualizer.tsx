import React, { useState, useEffect, useRef } from 'react';
import {
  createGrid,
  dijkstra,
  Grid,
  Cell
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
import { toast } from 'sonner';
import AnimatedCard from '@/components/ui/AnimatedCard';

interface PathfindingVisualizerProps {
  className?: string;
  algorithm?: string; // Make this prop optional with a default value
}

const PathfindingVisualizer: React.FC<PathfindingVisualizerProps> = ({ className, algorithm: externalAlgorithm }) => {
  const [grid, setGrid] = useState<Grid>([]);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(5);
  const [algorithm, setAlgorithm] = useState<string>(externalAlgorithm || 'dijkstra');
  const [gridSize, setGridSize] = useState<string>('10x10');
  
  const animationRef = useRef<number | null>(null);
  const gridStepsRef = useRef<Grid[]>([]);
  const pathRef = useRef<Cell[]>([]);
  const currentStepRef = useRef<number>(0);
  const isVisualizingPathRef = useRef<boolean>(false);

  useEffect(() => {
    if (externalAlgorithm) {
      setAlgorithm(externalAlgorithm.toLowerCase());
    }
  }, [externalAlgorithm]);

  useEffect(() => {
    initializeGrid();
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [gridSize]);

  const parseGridSize = (size: string): [number, number] => {
    const [rows, cols] = size.split('x').map(s => parseInt(s));
    return [rows, cols];
  };

  const initializeGrid = () => {
    const [rows, cols] = parseGridSize(gridSize);
    const newGrid = createGrid(rows, cols);
    addWalls(newGrid);
    setGrid(newGrid);
    resetState();
  };

  const addWalls = (grid: Grid) => {
    const [rows, cols] = [grid.length, grid[0].length];
    
    // Add some random walls
    const wallCount = Math.floor(rows * cols * 0.15); // 15% of cells as walls
    
    for (let i = 0; i < wallCount; i++) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      
      // Don't make walls on start or end positions
      if (!(grid[row][col].isStart || grid[row][col].isEnd)) {
        grid[row][col].isWall = true;
      }
    }
  };

  const resetState = () => {
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    setIsRunning(false);
    setIsPaused(false);
    gridStepsRef.current = [];
    pathRef.current = [];
    currentStepRef.current = 0;
    isVisualizingPathRef.current = false;
  };

  const startPathfinding = () => {
    resetState();
    setIsRunning(true);
    
    // Currently only Dijkstra's algorithm is implemented
    const { steps, path } = dijkstra([...grid.map(row => [...row.map(cell => ({ ...cell }))])]);
    
    if (steps.length === 0) {
      toast.error("No path found!");
      setIsRunning(false);
      return;
    }
    
    gridStepsRef.current = steps;
    pathRef.current = path;
    currentStepRef.current = 0;
    
    startAnimation();
  };

  const startAnimation = () => {
    if (!isVisualizingPathRef.current && currentStepRef.current >= gridStepsRef.current.length) {
      // Start visualizing the path
      isVisualizingPathRef.current = true;
      currentStepRef.current = 0;
    }
    
    if (isVisualizingPathRef.current && currentStepRef.current >= pathRef.current.length) {
      setIsRunning(false);
      toast.success("Pathfinding completed!");
      return;
    }
    
    const speedFactor = 11 - speed; // Invert speed so 10 is fastest
    const delayMs = speedFactor * 100;
    
    if (!isVisualizingPathRef.current) {
      // Visualizing visited cells
      const nextGrid = JSON.parse(JSON.stringify(gridStepsRef.current[currentStepRef.current]));
      setGrid(nextGrid);
    } else {
      // Visualizing the path
      const nextGrid = JSON.parse(JSON.stringify(grid));
      const cell = pathRef.current[currentStepRef.current];
      nextGrid[cell.row][cell.col].isPath = true;
      setGrid(nextGrid);
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
      startPathfinding();
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
    initializeGrid();
    toast.info("Pathfinding reset");
  };

  const handleStepForward = () => {
    setIsPaused(true);
    
    if (!isVisualizingPathRef.current && currentStepRef.current >= gridStepsRef.current.length) {
      // Start visualizing the path
      isVisualizingPathRef.current = true;
      currentStepRef.current = 0;
    }
    
    if (isVisualizingPathRef.current && currentStepRef.current >= pathRef.current.length) {
      setIsRunning(false);
      toast.success("Pathfinding completed!");
      return;
    }
    
    if (!isVisualizingPathRef.current) {
      // Visualizing visited cells
      const nextGrid = JSON.parse(JSON.stringify(gridStepsRef.current[currentStepRef.current]));
      setGrid(nextGrid);
    } else {
      // Visualizing the path
      const nextGrid = JSON.parse(JSON.stringify(grid));
      const cell = pathRef.current[currentStepRef.current];
      nextGrid[cell.row][cell.col].isPath = true;
      setGrid(nextGrid);
    }
    
    currentStepRef.current++;
  };

  const handleStepBackward = () => {
    setIsPaused(true);
    
    if (currentStepRef.current > 0) {
      currentStepRef.current--;
      
      if (isVisualizingPathRef.current) {
        if (currentStepRef.current === 0) {
          // Go back to visualizing visited cells
          isVisualizingPathRef.current = false;
          currentStepRef.current = gridStepsRef.current.length - 1;
          const nextGrid = JSON.parse(JSON.stringify(gridStepsRef.current[currentStepRef.current]));
          setGrid(nextGrid);
        } else {
          // Remove path cell
          const nextGrid = JSON.parse(JSON.stringify(grid));
          const cell = pathRef.current[currentStepRef.current];
          nextGrid[cell.row][cell.col].isPath = false;
          setGrid(nextGrid);
        }
      } else {
        // Go back to previous visited cells state
        const nextGrid = JSON.parse(JSON.stringify(gridStepsRef.current[currentStepRef.current]));
        setGrid(nextGrid);
      }
    }
  };

  const getCellClass = (cell: Cell) => {
    if (cell.isStart) return 'bg-green-500';
    if (cell.isEnd) return 'bg-red-500';
    if (cell.isWall) return 'bg-gray-800';
    if (cell.isPath) return 'bg-primary';
    if (cell.isVisited) return 'bg-accent';
    return 'bg-secondary';
  };

  return (
    <AnimatedCard className={className}>
      <Card className="p-6 glass-card">
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-medium mb-2">Pathfinding Visualization</h2>
            <p className="text-muted-foreground">Visualize pathfinding algorithms</p>
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
                <SelectItem value="dijkstra">Dijkstra's Algorithm</SelectItem>
              </SelectContent>
            </Select>
            
            <Select
              value={gridSize}
              onValueChange={setGridSize}
              disabled={isRunning}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Grid size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10x10">10x10</SelectItem>
                <SelectItem value="15x15">15x15</SelectItem>
                <SelectItem value="20x20">20x20</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={initializeGrid} disabled={isRunning}>
              New Grid
            </Button>
          </div>
        </div>
        
        <div className="mb-6 overflow-auto p-4 flex justify-center">
          <div 
            className="grid gap-0.5" 
            style={{ 
              gridTemplateColumns: `repeat(${grid[0]?.length || 0}, minmax(24px, 1fr))`,
              maxWidth: '650px',
            }}
          >
            {grid.map((row, rowIdx) =>
              row.map((cell, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  className={`
                    w-6 h-6 flex items-center justify-center rounded-sm
                    transition-all duration-300 ease-in-out
                    ${getCellClass(cell)}
                  `}
                >
                  {cell.isStart && <div className="text-xs">S</div>}
                  {cell.isEnd && <div className="text-xs">E</div>}
                </div>
              ))
            )}
          </div>
        </div>
        
        <div className="mb-4 flex justify-center">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
              <span className="text-sm">Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-sm"></div>
              <span className="text-sm">End</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
              <span className="text-sm">Wall</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent rounded-sm"></div>
              <span className="text-sm">Visited</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-sm"></div>
              <span className="text-sm">Path</span>
            </div>
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

export default PathfindingVisualizer;
