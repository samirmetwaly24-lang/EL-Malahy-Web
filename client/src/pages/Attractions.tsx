import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useAttractions } from "@/hooks/use-attractions";
import { AttractionCard } from "@/components/AttractionCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2, AlertCircle, Info, Sparkles } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import decoShape2 from "@assets/image_1771633791856.png";
import ridesHeaderImg from "@assets/2-_90_cm_X_130_cm_1_copy_1774099402724.png";
import decoShape3 from "@assets/image_1771633799636.png";

export default function Attractions() {
  const { data: attractions, isLoading } = useAttractions();
  const [filter, setFilter] = useState<'all' | 'Balance' | 'Bonus'>('all');

  const filteredAttractions = attractions?.filter(a => {
    if (filter === 'all') return true;
    return a.category === filter;
  });

  const heightData = [
    { name: "Dragon Force", height: "130–190 cm" },
    { name: "Monster Ride", height: "140–190 cm" },
    { name: "Bumper Cars", height: "90–115 cm (with adult), 115 cm+ alone" },
    { name: "Rock N Race", height: "120–190 cm" },
    { name: "Rocking Ship", height: "110–190 cm" },
    { name: "Air Trance", height: "130–190 cm" },
    { name: "Scream Drop", height: "120–190 cm" },
    { name: "Disco Slide", height: "130–190 cm" },
    { name: "Carousel", height: "under 105 cm (with adult), 105 cm+ alone" },
    { name: "Fly Funk (out chair)", height: "105–190 cm" },
    { name: "Fly Funk (in chair)", height: "90–105 cm" },
    { name: "Trampoline", height: "100 cm+" },
    { name: "Jump Around", height: "80–120 cm" },
    { name: "Speed Space", height: "80–120 cm" },
    { name: "First Wheel", height: "80–120 cm" },
    { name: "Soft Play", height: "90 cm+" },
    { name: "Ice Rink", height: "6 years+" },
    { name: "Rodeo Ball", height: "120 cm+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Floating Decorative Assets */}
        <motion.img 
          src={decoShape2}
          animate={{ y: [0, -15, 0], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-40 right-10 w-24 h-24 pointer-events-none"
        />
        <motion.img 
          src={decoShape3}
          animate={{ x: [0, 15, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-80 left-10 w-48 h-48 pointer-events-none"
        />

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-6"
          >
            <img
              src={ridesHeaderImg}
              alt="Rides & Games — A World of Joy"
              className="w-72 md:w-96 lg:w-[480px] h-auto object-contain drop-shadow-xl"
            />
          </motion.div>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { id: 'all', label: 'All Fun' },
              { id: 'Balance', label: 'Balance Rides' },
              { id: 'Bonus', label: 'Bonus Rides' },
            ].map((f) => (
              <Button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                variant={filter === f.id ? "default" : "outline"}
                className={`rounded-full px-8 py-6 text-lg transition-all duration-300 ${
                  filter === f.id 
                    ? "bg-primary text-white shadow-xl scale-110" 
                    : "hover:bg-primary/10"
                }`}
                data-testid={`filter-${f.id}`}
              >
                {f.label}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredAttractions?.map((attraction, index) => (
              <AttractionCard key={attraction.id} attraction={attraction} index={index} />
            ))}
          </div>
        )}

        {/* Disclaimer Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-[#008080] text-white p-8 md:p-12 rounded-[2rem] shadow-2xl mb-16 border-4 border-white/20"
        >
          <div className="flex items-center gap-4 mb-8">
            <AlertCircle className="w-10 h-10" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">Important Information</h2>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg md:text-xl font-medium">
            <li className="flex items-start gap-3">
              <span className="text-2xl">•</span>
              Ticket valid only for 1 person with entrance EGP 150.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">•</span>
              Card price added to any package.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">•</span>
              No refunds or returns after purchase.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">•</span>
              Card balance expires after 30 days.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">•</span>
              Card credit transfer is valid for entry.
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">•</span>
              (Entry fees/Bonus credit required).
            </li>
          </ul>
        </motion.div>

        {/* Height Table Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#FBBF24] rounded-[2rem] overflow-hidden shadow-2xl mb-8"
        >
          <div className="p-8 bg-black/5 flex items-center gap-3">
            <Info className="w-8 h-8 text-white" />
            <h2 className="text-3xl font-display font-bold text-white">Games Height List</h2>
          </div>
          <div className="p-4 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
              {heightData.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-white/20 text-white font-bold text-lg">
                  <span>{item.name}</span>
                  <span className="text-right ml-4">{item.height}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Note under table */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center space-y-2 mb-20"
        >
          <p className="text-[#FF4D4D] text-xl md:text-2xl font-bold italic">
            "Bounce rides can also consume from Balance if Bounce credit finishes."
          </p>
          <p className="text-[#FF4D4D] text-xl md:text-2xl font-bold italic">
            "Balance rides cannot consume from Bounce if Balance finishes."
          </p>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}