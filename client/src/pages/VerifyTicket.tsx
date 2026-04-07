import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { CheckCircle2, XCircle, Loader2, QrCode, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function VerifyTicket() {
  const [, params] = useRoute("/verify/:id");
  const { data: booking, isLoading, error } = useQuery({
    queryKey: [`/api/bookings/${params?.id}`],
    enabled: !!params?.id
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-20 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-card p-12 rounded-[3rem] shadow-2xl border-4 border-primary/20 text-center"
        >
          {isLoading ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-16 h-16 animate-spin text-primary" />
              <p className="text-xl font-bold">Verifying Ticket...</p>
            </div>
          ) : error || !booking ? (
            <div className="flex flex-col items-center gap-6">
              <XCircle className="w-24 h-24 text-red-500" />
              <div>
                <h1 className="text-4xl font-display font-bold text-red-600 mb-2">Invalid Ticket</h1>
                <p className="text-muted-foreground text-lg">This ticket code was not found in our system or has expired.</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <CheckCircle2 className="w-24 h-24 text-green-500" />
              <div>
                <h1 className="text-4xl font-display font-bold text-green-600 mb-2">Ticket Verified</h1>
                <p className="text-muted-foreground text-lg">Welcome to ElMalahy! Enjoy your adventure.</p>
              </div>
              
              <div className="w-full bg-muted/30 p-8 rounded-2xl text-left border border-border/50">
                <div className="flex items-center gap-2 mb-6 text-primary font-bold uppercase tracking-widest text-sm">
                  <ShieldCheck className="w-5 h-5" /> Security Details
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase font-bold">Ticket ID</div>
                    <div className="text-lg font-mono font-bold">#EM-{booking.id.toString().padStart(6, '0')}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-muted-foreground uppercase font-bold">Holder</div>
                      <div className="font-bold">{booking.name}</div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase font-bold">Guests</div>
                      <div className="font-bold">{booking.guests} People</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-primary font-bold">
                <QrCode className="w-5 h-5" /> Scanned via Internal System
              </div>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}