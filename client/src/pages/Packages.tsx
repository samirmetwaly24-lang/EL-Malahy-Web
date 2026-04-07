import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { usePackages } from "@/hooks/use-packages";
import { Check, Ticket, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import decoShape1 from "@assets/image_1771633780637.png";
import decoShape2 from "@assets/image_1771633791856.png";

export default function Packages() {
  const { data: packages, isLoading } = usePackages();

  // Fix duplicate bundles using unique names
  const uniquePackages = packages ? Array.from(new Map(packages.map(pkg => [pkg.name, pkg])).values()) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16 relative">
        {/* Decorative Elements */}
        <motion.img 
          src={decoShape1}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-0 w-24 h-24 opacity-10 hidden lg:block pointer-events-none"
        />
        <motion.img 
          src={decoShape2}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-0 w-32 h-32 opacity-10 hidden lg:block pointer-events-none"
        />

        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-7xl font-bold text-primary mb-6"
          >
            Ticket Packages
          </motion.h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect pass for your adventure. 
            All tickets include entry to shows and entertainment!
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {uniquePackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full flex flex-col relative overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${pkg.popular ? 'border-secondary shadow-xl scale-105 z-10' : 'border-border/50'}`}>
                  {pkg.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-secondary text-secondary-foreground text-xs font-bold px-8 py-1 rotate-45 translate-x-8 translate-y-4 shadow-sm">
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className={`${pkg.popular ? 'bg-secondary/10' : 'bg-muted/30'} p-8 text-center`}>
                    <CardTitle className="font-display text-3xl font-bold mb-2">{pkg.name}</CardTitle>
                    <CardDescription className="text-base">{pkg.description}</CardDescription>
                    <div className="mt-6 flex items-baseline justify-center text-foreground">
                      <span className="text-5xl font-bold tracking-tight">${(pkg.price / 100).toFixed(0)}</span>
                      <span className="text-muted-foreground ml-1">/person</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-8 flex-1">
                    <ul className="space-y-4">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <div className={`mr-3 mt-0.5 rounded-full p-1 ${pkg.popular ? 'bg-secondary text-secondary-foreground' : 'bg-primary/10 text-primary'}`}>
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="p-8 pt-0">
                    <Link href="/booking" className="w-full">
                      <Button size="lg" className={`w-full rounded-xl text-lg font-bold h-14 ${pkg.popular ? 'bg-primary hover:bg-primary/90' : 'bg-background border-2 border-primary text-primary hover:bg-primary/5'}`}>
                        Select Package
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
