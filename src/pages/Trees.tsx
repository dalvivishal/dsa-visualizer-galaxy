
import React from 'react';
import { Layout } from '@/components/Layout';
import BinaryTreeVisualizer from '@/components/visualizations/BinaryTreeVisualizer';
import AnimatedCard from '@/components/ui/AnimatedCard';

const Trees = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-green-500">
            Tree Traversals
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize different ways to traverse tree data structures.
          </p>
        </AnimatedCard>
        
        <BinaryTreeVisualizer className="mb-8" />
        
        <AnimatedCard delay={200} className="mb-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Tree Traversal Methods</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">In-Order Traversal</h3>
                <p className="text-muted-foreground">Visit order: Left → Root → Right</p>
                <p className="text-muted-foreground">Time Complexity: O(n)</p>
                <p className="text-muted-foreground">Space Complexity: O(h)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Pre-Order Traversal</h3>
                <p className="text-muted-foreground">Visit order: Root → Left → Right</p>
                <p className="text-muted-foreground">Time Complexity: O(n)</p>
                <p className="text-muted-foreground">Space Complexity: O(h)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Post-Order Traversal</h3>
                <p className="text-muted-foreground">Visit order: Left → Right → Root</p>
                <p className="text-muted-foreground">Time Complexity: O(n)</p>
                <p className="text-muted-foreground">Space Complexity: O(h)</p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </Layout>
  );
};

export default Trees;
