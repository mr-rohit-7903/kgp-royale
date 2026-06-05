import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import Tournament from "./pages/Tournament";
import Team from "./pages/Team";
import LeaderboardPage from "./pages/Leaderboard";
import Upcoming from "./pages/Upcoming";
import NotFound from "./pages/NotFound";
import Profile from "./pages/user/Profile";
import LogIn from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PublicProfile from "./pages/PublicProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthProvider>
          <div className="flex flex-col min-h-screen relative overflow-hidden">
            <Navbar />
            <main className="flex-1 relative z-10 pt-20">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/tournament" element={<Tournament />} />
                <Route path="/team" element={<Team />} />
                <Route path="/upcoming" element={<Upcoming />} />
                <Route path="/leaderboard" element={<LeaderboardPage />} />
                <Route path="/user/profile" element={<Profile />} />
                <Route path="/profile/:playerTag" element={<PublicProfile />} />
                <Route path="/login" element={<LogIn/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Analytics />
          </div>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
