import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/contexts/CartContext";
import CartSheet from "@/components/CartSheet";
import Index from "./pages/Index";
import Shawls from "./pages/Shawls";
import Pherans from "./pages/Pherans";
import Handbags from "./pages/Handbags";
import DryFruits from "./pages/DryFruits";
import GiftHampers from "./pages/GiftHampers";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CartSheet />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shawls" element={<Shawls />} />
              <Route path="/pherans" element={<Pherans />} />
              <Route path="/handbags" element={<Handbags />} />
              <Route path="/dry-fruits" element={<DryFruits />} />
              <Route path="/gift-hampers" element={<GiftHampers />} />
              <Route path="/about" element={<About />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;