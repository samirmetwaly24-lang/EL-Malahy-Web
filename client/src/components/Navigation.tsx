import { Link, useLocation } from "wouter";
import { Calendar, Mail, Gamepad2, Ticket, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import elMalahyLogo from "@assets/image_1771636686477.png";
import elMalahyWhiteLogo from "@assets/el_malahy_white_logo-01_1774098314085.png";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [energyLevel, setEnergyLevel] = useState("Very High");
  const { isDark } = useTheme();

  useEffect(() => {
    setEnergyLevel("Very High");
  }, []);

  const links = [
    { href: "/", label: "Home", icon: null },
    { href: "/attractions", label: "Rides & Games", icon: <Gamepad2 className="w-4 h-4 mr-2" /> },
    { href: "/packages", label: "Packages", icon: <Ticket className="w-4 h-4 mr-2" /> },
    { href: "/events", label: "Events", icon: <Calendar className="w-4 h-4 mr-2" /> },
    { href: "/contact", label: "Contact", icon: <Mail className="w-4 h-4 mr-2" /> },
  ];

  return (
    <div className="w-full">
      {/* Energy Bar */}
      <div className="bg-secondary text-secondary-foreground py-2 overflow-hidden relative shadow-inner">
        <motion.div 
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="container mx-auto px-4 flex items-center justify-center gap-2 font-black text-sm uppercase tracking-widest"
        >
          <Flame className="w-4 h-4 fill-current animate-bounce" />
          Today's Park Energy: <span className="underline decoration-wavy underline-offset-4">{energyLevel}!</span>
        </motion.div>
      </div>

      {/* Nav banner — purple in light mode, white in dark mode */}
      <nav className={cn(
        "sticky top-0 z-50 w-full border-b transition-colors duration-300",
        isDark
          ? "bg-white border-gray-200 shadow-md"
          : "bg-primary border-primary/20 shadow-md"
      )}>
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">

          {/* Logo — switches between purple and white version */}
          <Link href="/" className="flex items-center gap-2 group">
            <img
              src={isDark ? elMalahyLogo : elMalahyWhiteLogo}
              alt="ElMalahy - The Land of Amusement"
              className="h-24 md:h-32 w-auto transition-all duration-300 group-hover:scale-105"
              style={{ filter: isDark ? 'invert(0)' : 'none' }}
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-250 flex items-center gap-1 group/link hover:scale-105 hover:-translate-y-0.5 active:scale-95",
                  isDark
                    ? location === link.href
                      ? "bg-primary text-white shadow-md scale-105"
                      : "text-gray-700 hover:bg-primary/10 hover:text-primary"
                    : location === link.href
                      ? "bg-white/20 text-white shadow-md scale-105"
                      : "text-white/85 hover:bg-white/15 hover:text-white"
                )}
              >
                <span className="transition-transform duration-250 group-hover/link:scale-110 inline-flex">
                  {link.icon}
                </span>
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className={cn(
                "ml-4 px-6 py-2 rounded-full font-bold shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:scale-95",
                isDark
                  ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  : "bg-white text-primary hover:bg-white/90"
              )}
            >
              Book Now!
            </Link>
          </div>

          {/* Mobile Nav trigger */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className={cn(
                  "p-2 rounded-full transition-colors",
                  isDark ? "hover:bg-gray-100 text-primary" : "hover:bg-white/20 text-white"
                )}>
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4 mt-8">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-200 flex items-center active:scale-95",
                        location === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-foreground/70 hover:bg-muted hover:scale-[1.02]"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon}
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/booking"
                    className="mt-4 w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-center shadow-md active:scale-95 transition-transform"
                    onClick={() => setIsOpen(false)}
                  >
                    Book Tickets
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>
    </div>
  );
}
