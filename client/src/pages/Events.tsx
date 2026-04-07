import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useEvents } from "@/hooks/use-events";
import { CalendarDays, MapPin, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import tamerAshourImg from "@assets/540694420_665898036534502_6760838696307469375_n_1772062674044.jpg";
import ramySabryImg from "@assets/8a4ac2a7-9d5c-458d-99fc-c08f2e882054_1772062683522.jpg";

// Preload artist images
if (typeof window !== 'undefined') {
  [tamerAshourImg, ramySabryImg].forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

export default function Events() {
  const { data: events, isLoading } = useEvents();

  const staticEvents = [
    {
      id: 'static-1',
      title: "Tamer Ashour Live",
      description: "Experience an unforgettable night with the sensation Tamer Ashour at EL ARENA. Don't miss the magic!",
      date: new Date("2025-09-26T21:00:00"),
      image: tamerAshourImg,
      location: "EL ARENA"
    },
    {
      id: 'static-2',
      title: "Ramy Sabry Live",
      description: "Join the Arab Icon Ramy Sabry for a spectacular performance at EL ARENA. A night of pure musical bliss.",
      date: new Date("2025-11-21T21:00:00"),
      image: ramySabryImg,
      location: "EL ARENA"
    }
  ];

  const allEvents = [...(events || []), ...staticEvents].filter(e => 
    e.title !== "Summer Splash Festival" && e.title !== "Spooky Nights"
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold text-primary mb-6"
          >
            Special Events
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Mark your calendars! There's always something magical happening at ElMalahy.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {allEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.3) }}
                className="group flex flex-col md:flex-row bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all border border-border/50 h-full will-change-transform"
              >
                <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden bg-muted">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                  />
                  <div className="md:hidden absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl font-bold text-primary shadow-sm">
                    {format(new Date(event.date), "MMM d")}
                  </div>
                </div>
                
                <div className="p-8 flex flex-col justify-center flex-1 relative">
                  <div className="hidden md:block absolute top-6 right-6 text-center bg-primary/10 rounded-2xl p-3 min-w-[80px]">
                    <div className="text-sm font-bold text-primary uppercase">{format(new Date(event.date), "MMM")}</div>
                    <div className="text-3xl font-display font-bold text-primary">{format(new Date(event.date), "d")}</div>
                  </div>

                  <h3 className="font-display text-2xl font-bold mb-3 pr-16">{event.title}</h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{event.description}</p>
                  
                  <div className="flex flex-col gap-2 text-sm font-medium text-foreground/70 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary" />
                      <span>{format(new Date(event.date), "h:mm a")}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span>{event.location || "Main Plaza Stage"}</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto">
                    <Button variant="outline" className="rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary">
                      Event Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}

            {allEvents.length === 0 && (
              <div className="col-span-full text-center py-20 bg-muted/20 rounded-3xl">
                <CalendarDays className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-display font-bold text-muted-foreground">No upcoming events scheduled</h3>
                <p className="text-muted-foreground/80 mt-2">Check back soon for new announcements!</p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
