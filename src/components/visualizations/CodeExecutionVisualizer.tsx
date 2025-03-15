
import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface CodeSnippet {
  id: string;
  code: string;
  description: string;
}

interface CodeExecutionVisualizerProps {
  snippets: CodeSnippet[];
  activeSnippetId: string | null;
  className?: string;
}

const CodeExecutionVisualizer: React.FC<CodeExecutionVisualizerProps> = ({
  snippets,
  activeSnippetId,
  className
}) => {
  return (
    <Card className={cn("p-4 mb-4 glass-card", className)}>
      <h3 className="text-lg font-medium mb-2">Code Execution</h3>
      <div className="bg-muted/50 rounded-lg overflow-hidden">
        <pre className="p-4 text-sm overflow-auto max-h-[300px]">
          {snippets.map((snippet) => (
            <div 
              key={snippet.id}
              className={cn(
                "py-1 px-2 rounded transition-colors", 
                activeSnippetId === snippet.id ? 
                  "bg-primary text-primary-foreground" : 
                  "hover:bg-muted/80"
              )}
            >
              <code>{snippet.code}</code>
              {activeSnippetId === snippet.id && snippet.description && (
                <div className="text-xs mt-1 font-normal border-t border-primary/20 pt-1">
                  {snippet.description}
                </div>
              )}
            </div>
          ))}
        </pre>
      </div>
    </Card>
  );
};

export default CodeExecutionVisualizer;
