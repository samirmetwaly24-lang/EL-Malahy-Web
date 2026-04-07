import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertBooking } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create booking");
      }
      
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Booking Confirmed!",
        description: "We've received your booking request. Check your email for details.",
        variant: "default",
        className: "bg-green-500 text-white border-none",
      });
      // Invalidate any relevant queries if we had a bookings list
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
