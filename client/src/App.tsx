import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/context/ThemeContext";
import { FloatingControlButton } from "@/components/FloatingControlButton";
import { StarField } from "@/components/StarField";
import NotFound from "@/pages/not-found";

// Import pages
import Home from "@/pages/Home";
import Attractions from "@/pages/Attractions";
import Packages from "@/pages/Packages";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import RideDetails from "@/pages/RideDetails";
import VerifyTicket from "@/pages/VerifyTicket";
import TopThrillDetail from "@/pages/TopThrillDetail";
import { useEffect } from "react";
import { useLocation } from "wouter";

function ScrollToTop() {
  const [pathname] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <StarField />
      <FloatingControlButton />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/attractions" component={Attractions} />
        <Route path="/attractions/:id" component={RideDetails} />
        <Route path="/verify/:id" component={VerifyTicket} />
        <Route path="/top-thrill/:id" component={TopThrillDetail} />
        <Route path="/packages" component={Packages} />
        <Route path="/events" component={Events} />
        <Route path="/contact" component={Contact} />
        <Route path="/booking" component={Booking} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
