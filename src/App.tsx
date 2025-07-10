import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AIChat from "./pages/AIChat";
import Dashboards from "./pages/Dashboards";
import DashboardsList from "./pages/DashboardsList";
import NotFound from "./pages/NotFound";
import LinkedInAds from "./pages/LinkedInAds";
import WebID from "./pages/WebID";
import Campaigns from "./pages/Campaigns";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/dashboards" element={<DashboardsList />} />
          <Route path="/dashboards/:dashboardId" element={<Dashboards />} />
          <Route path="/linkedin-ads" element={<LinkedInAds />} />
          <Route path="/webid" element={<WebID />} />
          <Route path="/campaigns" element={<Campaigns />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;