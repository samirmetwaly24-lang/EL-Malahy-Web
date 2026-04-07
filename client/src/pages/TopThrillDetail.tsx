import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import axisImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.4_1771725386466.jpeg";
import tasweraImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.17__1771725386467.jpeg";
import koveImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.17_A_1771725386468.jpeg";
import filtrdImg from "@assets/WhatsApp_Image_2026-02-22_at_3.32.17_AM_1771725386468.jpeg";

const topThrillsData = {
  axis: {
    title: "Axis",
    category: "Restaurant",
    description: "Experience the pinnacle of theme park dining at Axis. Our restaurant offers a premium atmosphere where culinary excellence meets the excitement of ElMalahy. Enjoy a menu crafted by top chefs, featuring a fusion of international flavors and local favorites, all while surrounded by modern, elegant decor. Whether you're looking for a relaxing family lunch or a sophisticated dinner, Axis provides the perfect setting for a memorable meal.",
    image: axisImg
  },
  taswera: {
    title: "Taswera",
    category: "Photography Experience",
    description: "Taswera is more than just a photo booth; it's an immersive photography zone designed to capture the magic of your day. With creatively themed backdrops and high-end equipment, you can create professional-quality memories with your friends and family. Our friendly staff is on hand to help you find the best angles and poses, ensuring that every shot is a masterpiece. Don't just live the adventure—preserve it at Taswera.",
    image: tasweraImg
  },
  kove: {
    title: "Kove",
    category: "Cafe",
    description: "Take a break from the thrills at Kove, a vibrant cafe designed for relaxation and refreshment. Offering a curated selection of artisanal snacks, refreshing cold drinks, and light meals, Kove is the ideal spot to recharge. Its modern, airy design and comfortable seating provide a peaceful escape within the heart of the park. From quick bites to leisurely sips, Kove has everything you need to keep your energy high and your spirits higher.",
    image: koveImg
  },
  filtrd: {
    title: "Filtrd",
    category: "Cafe",
    description: "For the true coffee connoisseur, Filtrd is a sanctuary of flavor. We specialize in premium, single-origin beans and precision brewing methods that highlight the complex notes of every cup. Our expert baristas are passionate about coffee and dedicated to serving the perfect brew every time. Whether you prefer a classic espresso or a delicate pour-over, Filtrd offers a sophisticated coffee experience that stands out in the bustling amusement park environment.",
    image: filtrdImg
  }
};

export default function TopThrillDetail() {
  const [, params] = useRoute("/top-thrill/:id");
  const data = topThrillsData[params?.id as keyof typeof topThrillsData];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Content Not Found</h1>
          <Link href="/">
            <Button>Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <Navigation />
      
      <main className="container mx-auto px-4 py-12">
        <Link href="/">
          <Button variant="ghost" className="mb-8 hover:bg-primary/10 hover:text-primary rounded-full">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to Top Thrills
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white"
          >
            <img 
              src={data.image} 
              alt={data.title} 
              className="w-full h-auto object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="bg-primary/10 text-primary px-4 py-1 rounded-full font-bold uppercase text-sm mb-4 inline-block">
                {data.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold text-primary leading-tight">
                {data.title}
              </h1>
            </div>

            <div className="prose prose-lg text-muted-foreground leading-relaxed">
              <p>{data.description}</p>
            </div>

            <div className="p-8 bg-muted/30 rounded-3xl border border-border/50">
              <h3 className="text-xl font-bold mb-4">What to Expect</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-1">1</span>
                  <span>Premium atmosphere and top-tier service.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-1">2</span>
                  <span>Immersive design that fits the amusement park theme.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold mt-1">3</span>
                  <span>Memorable experiences for families and friends.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}