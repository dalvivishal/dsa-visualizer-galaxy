
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FibonacciVisualizer from '@/components/visualizations/FibonacciVisualizer';
import KnapsackVisualizer from '@/components/visualizations/KnapsackVisualizer';
import LCSVisualizer from '@/components/visualizations/LCSVisualizer';

const DynamicProgramming = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-orange-500">
            Dynamic Programming
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualize how dynamic programming solves complex problems by breaking them into simpler subproblems.
          </p>
        </AnimatedCard>
        
        <AnimatedCard delay={100} className="mb-8">
          <Tabs defaultValue="fibonacci">
            <TabsList className="mb-4">
              <TabsTrigger value="fibonacci">Fibonacci</TabsTrigger>
              <TabsTrigger value="knapsack">Knapsack</TabsTrigger>
              <TabsTrigger value="lcs">Longest Common Subsequence</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fibonacci">
              <FibonacciVisualizer />
            </TabsContent>

            <TabsContent value="knapsack">
              <KnapsackVisualizer />
            </TabsContent>

            <TabsContent value="lcs">
              <LCSVisualizer />
            </TabsContent>
          </Tabs>
        </AnimatedCard>
        
        <AnimatedCard delay={200} className="mb-8">
          <div className="bg-muted/50 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">What is Dynamic Programming?</h2>
            <p className="mb-4">
              Dynamic Programming (DP) is a technique for solving complex problems by breaking them down into simpler subproblems. 
              It is applicable when subproblems overlap and have optimal substructure.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Memoization (Top-down)</h3>
                <p className="text-muted-foreground">
                  Solve the problem recursively and cache the results of subproblems to avoid redundant calculations.
                </p>
              </div>
              <div className="bg-background p-4 rounded-md shadow">
                <h3 className="font-medium mb-2">Tabulation (Bottom-up)</h3>
                <p className="text-muted-foreground">
                  Build a table of solutions to subproblems iteratively, starting from the smallest subproblems.
                </p>
              </div>
            </div>
          </div>
        </AnimatedCard>
      </section>
    </Layout>
  );
};

export default DynamicProgramming;
