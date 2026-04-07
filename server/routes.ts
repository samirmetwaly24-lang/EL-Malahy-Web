import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.attractions.list.path, async (req, res) => {
    const allAttractions = await storage.getAttractions();
    res.json(allAttractions);
  });

  app.get(api.packages.list.path, async (req, res) => {
    const allPackages = await storage.getPackages();
    res.json(allPackages);
  });

  app.get(api.events.list.path, async (req, res) => {
    const allEvents = await storage.getEvents();
    res.json(allEvents);
  });

  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const schemaWithCoercion = api.bookings.create.input.extend({
        date: z.coerce.date(),
        guests: z.coerce.number(),
        packageId: z.coerce.number()
      });
      const input = schemaWithCoercion.parse(req.body);
      const booking = await storage.createBooking(input);
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get("/api/bookings/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const booking = await storage.getBooking(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const { db } = await import("./db");
  const { attractions, packages, events } = await import("@shared/schema");
  
  const existingAttractions = await storage.getAttractions();
  if (existingAttractions.length === 0) {
    const balanceRides = [
      { name: "Dragon Force", height: "130–190 cm", category: "Balance" },
      { name: "Monster Ride", height: "140–190 cm", category: "Balance" },
      { name: "Air Trance", height: "130–190 cm", category: "Balance" },
      { name: "Horror House", height: "130 cm+", category: "Balance" },
      { name: "Trampoline", height: "100 cm+", category: "Balance" },
      { name: "Carnival Games", height: "All ages", category: "Balance" },
      { name: "Scream Drop", height: "120–190 cm", category: "Balance" },
      { name: "Ice Rink", height: "6 years+", category: "Balance" },
      { name: "Rock N Race", height: "120–190 cm", category: "Balance" },
      { name: "Rodeo Games", height: "120 cm+", category: "Balance" },
      { name: "Redemption Game", height: "All ages", category: "Balance" },
      { name: "War Zone", height: "All ages", category: "Balance" },
      { name: "Speed Space", height: "80–120 cm", category: "Balance" },
      { name: "VR", height: "All ages", category: "Balance" },
      { name: "Bumper Cars", height: "90–115 cm (with adult), 115 cm+ alone", category: "Balance" },
    ];

    const bonusRides = [
      { name: "Fly Funk", height: "90–190 cm", category: "Bonus" },
      { name: "Carousel", height: "under 105 cm (with adult), 105 cm+ alone", category: "Bonus" },
      { name: "Rocking Ship", height: "110–190 cm", category: "Bonus" },
      { name: "Disco Slide", height: "130–190 cm", category: "Bonus" },
      { name: "Soft Play", height: "90 cm+", category: "Bonus" },
      { name: "Jump Around", height: "80–120 cm", category: "Bonus" },
      { name: "Video Games", height: "All ages", category: "Bonus" },
    ];

    const allRideData = [...balanceRides, ...bonusRides].map(ride => ({
      name: ride.name,
      description: `Experience the thrill of ${ride.name}! Fun and excitement guaranteed.`,
      type: "ride",
      category: ride.category,
      heightLimit: ride.height,
      rules: "Follow all safety guidelines and staff instructions.",
      image: `https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?q=80&w=800&auto=format&fit=crop`
    }));

    await db.insert(attractions).values(allRideData);

    await db.insert(packages).values([
      {
        name: "Starter Fun Package",
        description: "Perfect for a quick visit. Includes access to all Balance rides and bonus credit.",
        price: 52500,
        features: ["Access to all Balance rides", "Bonus credit", "Valid for 30 days"],
        popular: false
      },
      {
        name: "Ultimate Thrill Package",
        description: "For true thrill-seekers. Maximum access and extra bonus credit.",
        price: 75000,
        features: ["Maximum ride access", "Extra bonus credit", "Priority access"],
        popular: true
      }
    ]);

    await db.insert(events).values([
      {
        title: "Summer Splash Festival",
        description: "Annual summer celebration with water rides and music.",
        date: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        image: "https://images.unsplash.com/photo-1496843916299-5904cb0c8e17"
      }
    ]);
  }
}