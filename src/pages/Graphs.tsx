
import React from 'react';
import { Layout } from '@/components/Layout';
import PathfindingVisualizer from '@/components/visualizations/PathfindingVisualizer';
import AnimatedCard from '@/components/ui/AnimatedCard';

const Graphs = () => {
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
        
        <PathfindingVisualizer className="mb-8" />
        
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
