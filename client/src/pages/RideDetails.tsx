import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAttractions } from "@/hooks/use-attractions";
import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Loader2, ShieldCheck, Ruler, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function RideDetails() {
  const [, params] = useRoute("/attractions/:id");
  const { data: attractions, isLoading } = useAttractions();
  const attraction = attractions?.find(a => a.id === Number(params?.id));

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4">Ride Not Found</h1>
        <Link href="/attractions">
          <Button>Back to Attractions</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <img 
              src={attraction.image} 
              alt={attraction.name} 
              className="w-full h-[600px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <div className="flex gap-3 mb-4">
                <span className="bg-secondary text-secondary-foreground px-4 py-1 rounded-full font-bold uppercase text-sm">
                  {attraction.category} Ride
                </span>
                <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-bold uppercase text-sm">
                  {attraction.type}
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-primary mb-4 leading-tight">
                {attraction.name}
              </h1>
              <div className="flex items-center gap-2 text-2xl font-bold text-accent">
                <Tag className="w-6 h-6" />
                <span>Price included in Balance / Bonus Credit</span>
              </div>
            </div>

            <div className="p-8 bg-muted/30 rounded-3xl border border-border/50">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-primary" />
                Description
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {attraction.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                <Ruler className="w-6 h-6 text-primary mb-2" />
                <div className="text-sm text-muted-foreground">Height Requirement</div>
                <div className="text-lg font-bold">{attraction.heightLimit || "All ages"}</div>
              </div>
              <div className="p-6 bg-secondary/5 rounded-2xl border border-secondary/10">
                <Clock className="w-6 h-6 text-secondary mb-2" />
                <div className="text-sm text-muted-foreground">Duration</div>
                <div className="text-lg font-bold">~3-5 minutes</div>
              </div>
            </div>

            <div className="p-8 bg-accent/10 rounded-3xl border-4 border-accent/20">
              <h3 className="text-2xl font-display font-bold text-accent mb-6 flex items-center gap-2">
                <ShieldCheck className="w-8 h-8" />
                Rules & Safety
              </h3>
              <div className="text-lg font-medium leading-relaxed italic text-accent-foreground">
                "{attraction.rules || "Follow all safety guidelines and staff instructions."}"
              </div>
            </div>

            <Link href="/booking">
              <Button size="lg" className="w-full h-16 rounded-2xl text-xl font-bold shadow-xl">
                Book Your Adventure Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}