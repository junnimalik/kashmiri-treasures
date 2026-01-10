import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "@/contexts/CartContext";
import CartSheet from "@/components/CartSheet";
import ErrorBoundary from "@/components/ErrorBoundary";
import Index from "./pages/Index";
import Shawls from "./pages/Shawls";
import Pherans from "./pages/Pherans";
import Handbags from "./pages/Handbags";
import DryFruits from "./pages/DryFruits";
import GiftHampers from "./pages/GiftHampers";
import About from "./pages/About";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <CartSheet />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shawls" element={<Shawls />} />
                <Route path="/pherans" element={<Pherans />} />
                <Route path="/handbags" element={<Handbags />} />
                <Route path="/dry-fruits" element={<DryFruits />} />
                <Route path="/gift-hampers" element={<GiftHampers />} />
                <Route path="/about" element={<About />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<Admin />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </CartProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;