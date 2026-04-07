// storage.ts
import { db } from "./db";
import {
  attractions, packages, events, bookings, contactMessages,
  type Attraction, type Package, type Event, type Booking, type ContactMessage,
  type InsertAttraction, type InsertPackage, type InsertEvent, type InsertBooking, type InsertContactMessage
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getAttractions(): Promise<Attraction[]>;
  getPackages(): Promise<Package[]>;
  getEvents(): Promise<Event[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

// Mock data for fallback
const mockAttractions = [
  { id: 1, title: "Roller Coaster", description: "Fast ride", image: "", location: "Park A" },
  { id: 2, title: "Ferris Wheel", description: "Chill ride", image: "", location: "Park B" }
];

const mockPackages = [
  { id: 1, title: "Family Package", description: "Good for families", price: 100 }
];

const mockEvents = [
  { id: 1, title: "Music Festival", description: "Live music", date: new Date() }
];

export class DatabaseStorage implements IStorage {

  async getAttractions(): Promise<Attraction[]> {
    if (!db) return mockAttractions as any;
    return await db.select().from(attractions);
  }

  async getPackages(): Promise<Package[]> {
    if (!db) return mockPackages as any;
    return await db.select().from(packages);
  }

  async getEvents(): Promise<Event[]> {
    if (!db) return mockEvents as any;
    return await db.select().from(events);
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    if (!db) return { id, name: "Mock User" } as any;
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking;
  }

  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    if (!db) {
      return { id: Date.now(), ...insertBooking } as Booking;
    }
    const [booking] = await db.insert(bookings).values(insertBooking).returning();
    return booking;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    if (!db) {
      return { id: Date.now(), ...insertMessage } as ContactMessage;
    }
    const [message] = await db.insert(contactMessages).values(insertMessage).returning();
    return message;
  }
}

export const storage = new DatabaseStorage();