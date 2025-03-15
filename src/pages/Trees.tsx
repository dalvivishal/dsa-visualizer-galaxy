
import React, { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import BinaryTreeVisualizer from '@/components/visualizations/BinaryTreeVisualizer';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeExecutionVisualizer from '@/components/visualizations/CodeExecutionVisualizer';
import { getCodeSnippetsForAlgorithm } from '@/utils/codeSnippets';

const Trees = () => {
  const [traversalType, setTraversalType] = useState<string>('inOrder');
  const [activeCodeSnippetId, setActiveCodeSnippetId] = useState<string | null>(null);

  useEffect(() => {
    // Set the first code snippet as active when traversal type changes
    const snippets = getCodeSnippetsForAlgorithm(traversalType);
    setActiveCodeSnippetId(snippets[0]?.id || null);
  }, [traversalType]);

  const handleTabChange = (value: string) => {
    setTraversalType(value);
  };

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
        
        <AnimatedCard className="mb-8">
          <Tabs defaultValue="inOrder" onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="inOrder">In-Order</TabsTrigger>
              <TabsTrigger value="preOrder">Pre-Order</TabsTrigger>
              <TabsTrigger value="postOrder">Post-Order</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inOrder">
              <CodeExecutionVisualizer
                snippets={getCodeSnippetsForAlgorithm('inOrder')}
                activeSnippetId={activeCodeSnippetId}
                className="mb-4"
              />
            </TabsContent>
            
            <TabsContent value="preOrder">
              <CodeExecutionVisualizer
                snippets={getCodeSnippetsForAlgorithm('preOrder')}
                activeSnippetId={activeCodeSnippetId}
                className="mb-4"
              />
            </TabsContent>
            
            <TabsContent value="postOrder">
              <CodeExecutionVisualizer
                snippets={getCodeSnippetsForAlgorithm('postOrder')}
                activeSnippetId={activeCodeSnippetId}
                className="mb-4"
              />
            </TabsContent>
          </Tabs>
        </AnimatedCard>
        
        <BinaryTreeVisualizer 
          className="mb-8" 
          traversalType={traversalType}
        />
        
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
