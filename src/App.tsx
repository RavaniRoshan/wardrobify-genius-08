
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Discover from "./pages/Discover";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Collections from "./pages/Collections";
import { supabase } from "./integrations/supabase/client";
import { ThemeProvider } from "./context/ThemeContext";

// Create auth context
export type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

export const AuthContext = React.createContext<AuthContextType | null>(null);

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);

  const refreshUser = async () => {
    const { data } = await supabase.auth.getUser();
    if (data.user) {
      setUser(data.user);
    }
  };

  useEffect(() => {
    // Check if user is authenticated on mount
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const authStatus = !!data.session;
      const userData = data.session?.user || null;
      
      setIsAuthenticated(authStatus);
      setUser(userData);
      
      if (authStatus) {
        localStorage.setItem("isAuthenticated", "true");
        if (userData) {
          localStorage.setItem("user", JSON.stringify({ email: userData.email }));
        }
      }
    };
    
    checkAuth();
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
        setUser(session?.user || null);
        
        if (session) {
          localStorage.setItem("isAuthenticated", "true");
          if (session.user) {
            localStorage.setItem("user", JSON.stringify({ email: session.user.email }));
          }
        } else {
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("user");
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  const authContextValue = {
    isAuthenticated,
    user,
    logout,
    refreshUser
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContext.Provider value={authContextValue}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/discover" element={<Discover />} />
                <Route path="/how-it-works" element={<HowItWorks />} />
                <Route path="/about" element={<About />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:id" element={<Collections />} />
                <Route path="/quiz-section" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
