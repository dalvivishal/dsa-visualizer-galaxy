
import React from 'react';
import { Layout } from '@/components/Layout';
import LinkedListVisualizer from '@/components/visualizations/LinkedListVisualizer';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DataStructures = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-teal-500">
            Data Structures
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore various data structures and their operations.
          </p>
        </AnimatedCard>
        
        <AnimatedCard delay={100} className="mb-8">
          <Tabs defaultValue="linkedList">
            <TabsList className="mb-4">
              <TabsTrigger value="linkedList">Linked List</TabsTrigger>
              <TabsTrigger value="stack" disabled>Stack (Coming Soon)</TabsTrigger>
              <TabsTrigger value="queue" disabled>Queue (Coming Soon)</TabsTrigger>
              <TabsTrigger value="hashTable" disabled>Hash Table (Coming Soon)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="linkedList">
              <LinkedListVisualizer className="mb-8" />
            </TabsContent>
          </Tabs>
        </AnimatedCard>
        
        <AnimatedCard delay={200} className="mb-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Common Data Structures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Linked List</h3>
                <p className="text-muted-foreground mb-2">A linear collection of elements where each element points to the next.</p>
                <p className="text-sm">Operations: Insert, Delete, Traverse</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Stack</h3>
                <p className="text-muted-foreground mb-2">A collection based on the Last-In-First-Out (LIFO) principle.</p>
                <p className="text-sm">Operations: Push, Pop, Peek</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Queue</h3>
                <p className="text-muted-foreground mb-2">A collection based on the First-In-First-Out (FIFO) principle.</p>
                <p className="text-sm">Operations: Enqueue, Dequeue, Front</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Hash Table</h3>
                <p className="text-muted-foreground mb-2">A data structure that maps keys to values using a hash function.</p>
                <p className="text-sm">Operations: Insert, Search, Delete</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Binary Tree</h3>
                <p className="text-muted-foreground mb-2">A tree where each node has at most two children.</p>
                <p className="text-sm">Operations: Insert, Delete, Traverse</p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Heap</h3>
                <p className="text-muted-foreground mb-2">A specialized tree-based data structure that satisfies the heap property.</p>
                <p className="text-sm">Operations: Insert, Extract-Min/Max, Heapify</p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </Layout>
  );
};

export default DataStructures;
