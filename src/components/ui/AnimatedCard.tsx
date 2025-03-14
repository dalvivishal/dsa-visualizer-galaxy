
import React from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  className,
  children,
  delay = 0,
}) => {
  return (
    <div 
      className={cn("animate-slide-up", className)} 
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedCard;
