import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useSubmitContact } from "@/hooks/use-contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  const submitContact = useSubmitContact();
  
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: InsertContactMessage) {
    submitContact.mutate(data, {
      onSuccess: () => {
        form.reset();
      }
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-display text-5xl font-bold text-primary mb-6">Get in Touch</h1>
              <p className="text-xl text-muted-foreground">
                Have questions about ticket pricing, park hours, or group events? We're here to help!
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-border/50">
                <div className="bg-secondary/20 p-3 rounded-full text-secondary-foreground">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Phone</h3>
                  <p className="text-muted-foreground mb-1">General Inquiries: (555) 123-4567</p>
                  <p className="text-muted-foreground">Group Sales: (555) 123-4568</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-border/50">
                <div className="bg-primary/20 p-3 rounded-full text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email</h3>
                  <p className="text-muted-foreground">info@funland.com</p>
                  <p className="text-muted-foreground">support@funland.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-border/50">
                <div className="bg-accent/20 p-3 rounded-full text-accent">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">123 Amusement Way</p>
                  <p className="text-muted-foreground">Orlando, FL 32801</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card p-8 rounded-3xl shadow-xl border border-border/50"
          >
            <h2 className="font-display text-2xl font-bold mb-6">Send us a Message</h2>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" className="rounded-xl h-12 bg-muted/30 border-muted" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" className="rounded-xl h-12 bg-muted/30 border-muted" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" className="rounded-xl h-12 bg-muted/30 border-muted" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us more details..." 
                          className="rounded-xl min-h-[150px] bg-muted/30 border-muted resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={submitContact.isPending}
                  className="w-full h-12 rounded-xl text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"} 
                  {!submitContact.isPending && <Send className="ml-2 w-4 h-4" />}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
