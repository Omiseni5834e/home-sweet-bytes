import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GuidedTour } from "./components/GuidedTour";
import Index from "./pages/Index";
import Scrapbook from "./pages/Scrapbook";
import Puzzle from "./pages/Puzzle";
import Video from "./pages/Video";
import Poem from "./pages/Poem";
import Surprise1 from "./pages/Surprise1";
import Surprise2 from "./pages/Surprise2";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GuidedTour />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/scrapbook" element={<Scrapbook />} />
          <Route path="/puzzle" element={<Puzzle />} />
          <Route path="/video" element={<Video />} />
          <Route path="/poem" element={<Poem />} />
          <Route path="/surprise1" element={<Surprise1 />} />
          <Route path="/surprise2" element={<Surprise2 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
