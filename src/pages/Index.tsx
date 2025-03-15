
import React from 'react';
import { Layout } from '@/components/Layout';
import FeatureCard from '@/components/ui/FeatureCard';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { ArrowRight, ListTree, GitMerge, Braces, Network, Infinity } from 'lucide-react';
import ArrayVisualizer from '@/components/visualizations/ArrayVisualizer';
import SortingVisualizer from '@/components/visualizations/SortingVisualizer';
import LinkedListVisualizer from '@/components/visualizations/LinkedListVisualizer';
import BinaryTreeVisualizer from '@/components/visualizations/BinaryTreeVisualizer';
import PathfindingVisualizer from '@/components/visualizations/PathfindingVisualizer';

const Index = () => {
  return (
    <Layout>
      <section className="container mx-auto px-4 py-16">
        <AnimatedCard className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
            Visualize Data Structures & Algorithms
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Interactive visualizations to help you understand how data structures and algorithms work
            in real time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#visualizers" className="inline-flex items-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Try Visualizations <ArrowRight className="ml-2" />
            </a>
            <a href="#algorithms" className="inline-flex items-center px-6 py-3 rounded-lg border border-primary text-primary bg-transparent hover:bg-primary/10 transition-colors">
              Explore Algorithms
            </a>
          </div>
        </AnimatedCard>
        
        <div className="grid grid-cols-1 gap-8 mb-16" id="visualizers">
          <AnimatedCard delay={100}>
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Visualizations</h2>
          </AnimatedCard>
          
          <ArrayVisualizer className="mb-8" />
          
          <SortingVisualizer className="mb-8" />
          
          <LinkedListVisualizer className="mb-8" />
          
          <BinaryTreeVisualizer className="mb-8" />
          
          <PathfindingVisualizer className="mb-8" />
        </div>
        
        <div className="mb-16" id="algorithms">
          <AnimatedCard delay={200}>
            <h2 className="text-3xl font-bold mb-8 text-center">Explore Algorithm Categories</h2>
          </AnimatedCard>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Sorting Algorithms"
              description="Visualize bubble sort, quick sort, merge sort and more sorting algorithms."
              icon={<Braces />}
              to="/sorting"
              delay={300}
            />
            
            <FeatureCard
              title="Graph Algorithms"
              description="Explore BFS, DFS, Dijkstra's algorithm, and other graph traversal methods."
              icon={<Network />}
              to="/graphs"
              delay={400}
            />
            
            <FeatureCard
              title="Tree Traversals"
              description="Learn different ways to traverse and manipulate tree structures."
              icon={<GitMerge />}
              to="/trees"
              delay={500}
            />
            
            <FeatureCard
              title="Dynamic Programming"
              description="Visualize how DP solutions build optimal results from subproblems."
              icon={<Infinity />}
              to="/dynamic-programming"
              delay={600}
            />
            
            <FeatureCard
              title="Data Structures"
              description="Interact with stacks, queues, hash tables, and other essential data structures."
              icon={<ListTree />}
              to="/data-structures"
              delay={700}
            />
            
            <FeatureCard
              title="Search Algorithms"
              description="Visualize binary search, linear search, and other searching techniques."
              icon={<ArrowRight />}
              to="/search"
              delay={800}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
