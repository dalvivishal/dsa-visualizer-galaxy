import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import PathfindingVisualizer from '@/components/visualizations/PathfindingVisualizer';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeExecutionVisualizer from '@/components/visualizations/CodeExecutionVisualizer';
import { getCodeSnippetsForAlgorithm } from '@/utils/codeSnippets';

const Graphs = () => {
  const [algorithm, setAlgorithm] = useState<string>('bfs');
  const [activeCodeSnippetId, setActiveCodeSnippetId] = useState<string | null>(null);

  useEffect(() => {
    // Set the first code snippet as active when algorithm changes
    const snippets = getCodeSnippetsForAlgorithm(algorithm);
    setActiveCodeSnippetId(snippets[0]?.id || null);
  }, [algorithm]);

  const handleTabChange = (value: string) => {
    setAlgorithm(value);
  };

  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Graph Algorithms
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore graph traversal algorithms and pathfinding techniques.
          </p>
        </AnimatedCard>
        
        <AnimatedCard className="mb-8">
          <Tabs defaultValue="bfs" onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="bfs">BFS</TabsTrigger>
              <TabsTrigger value="dijkstra">Dijkstra's Algorithm</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bfs">
              <CodeExecutionVisualizer
                snippets={getCodeSnippetsForAlgorithm('bfs')}
                activeSnippetId={activeCodeSnippetId}
                className="mb-4"
              />
            </TabsContent>
            
            <TabsContent value="dijkstra">
              <CodeExecutionVisualizer
                snippets={getCodeSnippetsForAlgorithm('dijkstra')}
                activeSnippetId={activeCodeSnippetId}
                className="mb-4"
              />
            </TabsContent>
          </Tabs>
        </AnimatedCard>
        
        <PathfindingVisualizer 
          className="mb-8" 
          onAlgorithmStep={(step) => {
            // This would be implemented in PathfindingVisualizer to update the active code snippet
            // based on the current algorithm step
          }}
          algorithm={algorithm}
        />
        
        <AnimatedCard delay={200} className="mb-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Algorithm Complexity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Breadth-First Search (BFS)</h3>
                <p className="text-muted-foreground">Time Complexity: O(V + E)</p>
                <p className="text-muted-foreground">Space Complexity: O(V)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Depth-First Search (DFS)</h3>
                <p className="text-muted-foreground">Time Complexity: O(V + E)</p>
                <p className="text-muted-foreground">Space Complexity: O(V)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Dijkstra's Algorithm</h3>
                <p className="text-muted-foreground">Time Complexity: O((V + E) log V)</p>
                <p className="text-muted-foreground">Space Complexity: O(V)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">A* Search Algorithm</h3>
                <p className="text-muted-foreground">Time Complexity: O(E)</p>
                <p className="text-muted-foreground">Space Complexity: O(V)</p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </Layout>
  );
};

export default Graphs;
