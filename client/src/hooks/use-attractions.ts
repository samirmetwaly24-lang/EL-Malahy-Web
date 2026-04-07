import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useAttractions() {
  return useQuery({
    queryKey: [api.attractions.list.path],
    queryFn: async () => {
      const res = await fetch(api.attractions.list.path);
      if (!res.ok) throw new Error("Failed to fetch attractions");
      return api.attractions.list.responses[200].parse(await res.json());
    },
  });
}
