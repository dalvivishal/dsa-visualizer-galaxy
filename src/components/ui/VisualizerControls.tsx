
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RefreshCw, 
  Settings 
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface VisualizerControlsProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  speed: number;
  onSpeedChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
  onSettingsClick?: () => void;
}

const VisualizerControls: React.FC<VisualizerControlsProps> = ({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStepForward,
  onStepBackward,
  speed,
  onSpeedChange,
  className,
  disabled = false,
  onSettingsClick
}) => {
  return (
    <div className={cn(
      "glass-effect rounded-lg p-4 flex items-center justify-between gap-4 animate-fade-in", 
      className
    )}>
      <div className="flex items-center gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onReset}
                disabled={disabled}
              >
                <RefreshCw size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Reset</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onStepBackward}
                disabled={disabled}
              >
                <SkipBack size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Step Backward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="default" 
                size="icon" 
                onClick={isPlaying ? onPause : onPlay}
                disabled={disabled}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isPlaying ? 'Pause' : 'Play'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onStepForward}
                disabled={disabled}
              >
                <SkipForward size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Step Forward</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="flex items-center gap-4 flex-1 max-w-[200px]">
        <span className="text-sm text-muted-foreground whitespace-nowrap">Speed</span>
        <Slider
          value={[speed]}
          min={1}
          max={10}
          step={1}
          onValueChange={(value) => onSpeedChange(value[0])}
          disabled={disabled}
        />
      </div>
      
      {onSettingsClick && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={onSettingsClick}
                disabled={disabled}
              >
                <Settings size={18} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default VisualizerControls;
