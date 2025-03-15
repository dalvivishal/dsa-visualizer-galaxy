
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Sorting from "./pages/Sorting";
import Graphs from "./pages/Graphs";
import Trees from "./pages/Trees";
import DynamicProgramming from "./pages/DynamicProgramming";
import DataStructures from "./pages/DataStructures";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/sorting" element={<Sorting />} />
          <Route path="/graphs" element={<Graphs />} />
          <Route path="/trees" element={<Trees />} />
          <Route path="/dynamic-programming" element={<DynamicProgramming />} />
          <Route path="/data-structures" element={<DataStructures />} />
          <Route path="/search" element={<Search />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
