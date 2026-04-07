import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertBookingSchema, type InsertBooking, type Booking } from "@shared/schema";
import { useCreateBooking } from "@/hooks/use-bookings";
import { usePackages } from "@/hooks/use-packages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Ticket, CheckCircle2, Download, QrCode } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

// Enhance schema to handle coercing string inputs from form to numbers/dates
const formSchema = insertBookingSchema.extend({
  packageId: z.coerce.number(),
  guests: z.coerce.number().min(1, "At least 1 guest required"),
  date: z.coerce.date()
});

export default function Booking() {
  const { data: packages, isLoading: isLoadingPackages } = usePackages();
  const createBooking = useCreateBooking();
  const [successBooking, setSuccessBooking] = useState<Booking | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      guests: 1,
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    createBooking.mutate(data, {
      onSuccess: (booking) => {
        setSuccessBooking(booking);
        form.reset();
      }
    });
  }

  const selectedPackageId = form.watch("packageId");
  const selectedPackage = packages?.find(p => p.id === selectedPackageId);
  const guestCount = form.watch("guests") || 1;
  const total = selectedPackage ? (selectedPackage.price * guestCount) : 0;

  if (successBooking) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto bg-card p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-primary/20 text-center"
          >
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-display font-bold text-primary mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground mb-10 text-lg">Your adventure at ElMalahy begins soon. Here is your digital E-Ticket.</p>

            <div className="bg-white p-8 rounded-[2rem] shadow-inner mb-8 border-2 border-dashed border-primary/30 relative">
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-card rounded-full" />
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-card rounded-full" />
              
              <div className="flex flex-col items-center gap-6">
                <div className="p-4 bg-white border-4 border-primary/10 rounded-2xl shadow-sm">
                  <QRCodeSVG 
                    value={`https://elmalahy.com/verify/${successBooking.id}`} 
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                
                <div className="w-full space-y-4 text-left">
                  <div className="flex justify-between border-b border-primary/5 pb-2">
                    <span className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Ticket Holder</span>
                    <span className="font-bold">{successBooking.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/5 pb-2">
                    <span className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Visit Date</span>
                    <span className="font-bold">{format(new Date(successBooking.date), "PPP")}</span>
                  </div>
                  <div className="flex justify-between border-b border-primary/5 pb-2">
                    <span className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Guests</span>
                    <span className="font-bold">{successBooking.guests} People</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground uppercase text-xs font-bold tracking-widest">Package</span>
                    <span className="font-bold text-primary">{packages?.find(p => p.id === successBooking.packageId)?.name}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 rounded-full h-14 font-bold text-lg">
                <Download className="mr-2 w-5 h-5" /> Download PDF
              </Button>
              <Button size="lg" variant="outline" onClick={() => setSuccessBooking(null)} className="flex-1 rounded-full h-14 font-bold text-lg">
                Book Another
              </Button>
            </div>
            
            <p className="mt-8 text-sm text-muted-foreground flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4" /> Present this QR code at the main entrance
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-5xl font-bold text-primary mb-4"
            >
              Book Your Adventure
            </motion.h1>
            <p className="text-muted-foreground">Secure your tickets today and skip the line at the gate!</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card p-8 md:p-10 rounded-3xl shadow-2xl border border-border"
          >
            {isLoadingPackages ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="h-12 rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john@example.com" className="h-12 rounded-xl" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="packageId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ticket Package</FormLabel>
                          <Select onValueChange={(val) => field.onChange(parseInt(val))} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-xl">
                                <SelectValue placeholder="Select a package" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {packages?.map((pkg) => (
                                <SelectItem key={pkg.id} value={pkg.id.toString()}>
                                  {pkg.name} - ${(pkg.price / 100).toFixed(0)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1" 
                              className="h-12 rounded-xl" 
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Visit Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "h-12 rounded-xl pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date()
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Summary Section */}
                  <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
                    <h3 className="font-display text-xl font-bold mb-4 flex items-center gap-2">
                      <Ticket className="w-5 h-5 text-primary" /> Booking Summary
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Package:</span>
                        <span className="font-medium">{selectedPackage?.name || "Not selected"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Guests:</span>
                        <span className="font-medium">{guestCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{form.watch("date") ? format(form.watch("date"), "PPP") : "Not selected"}</span>
                      </div>
                      <div className="border-t border-border pt-2 mt-2 flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-primary">${(total / 100).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg"
                    disabled={createBooking.isPending}
                    className="w-full h-14 rounded-xl text-xl font-bold bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
                  >
                    {createBooking.isPending ? "Processing..." : "Confirm Booking"}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
