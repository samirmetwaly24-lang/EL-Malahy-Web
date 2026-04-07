import { type Attraction } from "@shared/schema";
import { Ruler, Sparkles, Gamepad2, CreditCard, Star, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface AttractionCardProps {
  attraction: Attraction;
  index: number;
}

export function AttractionCard({ attraction, index }: AttractionCardProps) {
  const isBonus = attraction.category === 'Bonus';

  return (
    <Link href={`/attractions/${attraction.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-card rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border-4 border-border/50 hover:border-primary/50 cursor-pointer"
      >
        <div className="relative h-72 overflow-hidden">
          <img
            src={attraction.image}
            alt={attraction.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
          
          <div className="absolute top-4 right-4">
            <Badge 
              className={`text-sm font-bold px-4 py-2 rounded-full shadow-lg ${
                isBonus 
                  ? "bg-secondary text-secondary-foreground" 
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <div className="flex items-center gap-2">
                {isBonus ? <Star className="w-4 h-4 fill-current" /> : <CreditCard className="w-4 h-4" />}
                {attraction.category} Ride
              </div>
            </Badge>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <h3 className="text-3xl font-display font-bold text-white mb-2">{attraction.name}</h3>
            <div className="flex items-center gap-2 text-white/90 font-medium">
              <Ruler className="w-5 h-5 text-yellow-400" />
              <span>Height: {attraction.heightLimit || "All ages"}</span>
            </div>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
            <div className="bg-white text-primary rounded-full p-4 shadow-2xl transform scale-50 group-hover:scale-100 transition-transform">
              <ArrowRight className="w-8 h-8" />
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="mb-6">
            <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
              Ride Rules
            </h4>
            <p className="text-muted-foreground font-medium leading-relaxed italic line-clamp-2">
              "{attraction.rules || "Follow all safety guidelines and staff instructions."}"
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {attraction.type === 'game' && (
              <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 border-accent text-accent">
                <Gamepad2 className="w-4 h-4" />
                Skill Game
              </Badge>
            )}
            <Badge variant="outline" className="flex items-center gap-2 px-3 py-1.5 border-secondary text-secondary">
              <Sparkles className="w-4 h-4" />
              {isBonus ? 'Bonus Feature' : 'Balance Ride'}
            </Badge>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}