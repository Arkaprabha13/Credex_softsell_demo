/**
 * SoftSell - Software License Management Platform
 * Copyright © Arkaprabha Banerjee 2025. All rights reserved.
 */
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/ui/CustomCursor";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedBackground from "./components/ui/AnimatedBackground";
import Watermark from "./components/ui/Watermark";
// import Watermark from "./components/ui/Watermark";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add('dark');
    
    // Apply global styles to body
    document.body.style.background = 'linear-gradient(to bottom, #0c1829, #071228)';
    document.body.style.color = '#f3f4f6';
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CustomCursor />
        
        {/* Global animated background */}
        <AnimatedBackground />
        
        {/* Copyright watermark */}
        <Watermark />
        
        {/* Loading screen that shows before content loads */}
        <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        
        {/* Main content - only renders when loading is complete */}
        <div style={{ display: isLoading ? 'none' : 'block' }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
