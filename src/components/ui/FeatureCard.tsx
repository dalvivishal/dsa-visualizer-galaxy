
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
  className?: string;
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  to,
  className,
  delay = 0
}) => {
  return (
    <Link to={to}>
      <Card className={cn(
        "overflow-hidden p-6 relative group cursor-pointer glass-card hover:shadow-xl transition-all duration-300",
        "animate-slide-up",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
      >
        <div className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
        
        <div className="flex flex-col gap-4">
          <div className="h-12 w-12 bg-accent rounded-lg flex items-center justify-center text-accent-foreground">
            {icon}
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors duration-300">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          
          <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500" />
        </div>
      </Card>
    </Link>
  );
};

export default FeatureCard;
