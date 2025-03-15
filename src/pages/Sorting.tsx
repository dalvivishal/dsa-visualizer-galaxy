
import React from 'react';
import { Layout } from '@/components/Layout';
import SortingVisualizer from '@/components/visualizations/SortingVisualizer';
import AnimatedCard from '@/components/ui/AnimatedCard';

const Sorting = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Sorting Algorithms
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize how different sorting algorithms organize data in real-time.
          </p>
        </AnimatedCard>
        
        <SortingVisualizer className="mb-8" />
        
        <AnimatedCard delay={200} className="mb-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Algorithm Complexity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Bubble Sort</h3>
                <p className="text-muted-foreground">Time Complexity: O(n²)</p>
                <p className="text-muted-foreground">Space Complexity: O(1)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Selection Sort</h3>
                <p className="text-muted-foreground">Time Complexity: O(n²)</p>
                <p className="text-muted-foreground">Space Complexity: O(1)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Insertion Sort</h3>
                <p className="text-muted-foreground">Time Complexity: O(n²)</p>
                <p className="text-muted-foreground">Space Complexity: O(1)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Quick Sort</h3>
                <p className="text-muted-foreground">Time Complexity: O(n log n)</p>
                <p className="text-muted-foreground">Space Complexity: O(log n)</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Merge Sort</h3>
                <p className="text-muted-foreground">Time Complexity: O(n log n)</p>
                <p className="text-muted-foreground">Space Complexity: O(n)</p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </Layout>
  );
};

export default Sorting;
