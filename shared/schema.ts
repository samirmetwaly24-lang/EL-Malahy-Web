import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Rides & Games
export const attractions = pgTable("attractions", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // 'ride', 'game'
  category: text("category").notNull(), // 'Balance', 'Bonus'
  heightLimit: text("height_limit"), // String to support ranges and rules
  rules: text("rules"),
  image: text("image").notNull(),
});

export const insertAttractionSchema = createInsertSchema(attractions).omit({ id: true });
export type Attraction = typeof attractions.$inferSelect;
export type InsertAttraction = z.infer<typeof insertAttractionSchema>;

// Packages
export const packages = pgTable("packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // in cents
  features: text("features").array().notNull(),
  popular: boolean("popular").default(false),
});

export const insertPackageSchema = createInsertSchema(packages).omit({ id: true });
export type Package = typeof packages.$inferSelect;
export type InsertPackage = z.infer<typeof insertPackageSchema>;

// Events (Replacing Admin)
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  date: timestamp("date").notNull(),
  image: text("image").notNull(),
});

export const insertEventSchema = createInsertSchema(events).omit({ id: true });
export type Event = typeof events.$inferSelect;
export type InsertEvent = z.infer<typeof insertEventSchema>;

// Bookings
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  packageId: integer("package_id").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  date: timestamp("date").notNull(),
  guests: integer("guests").notNull(),
  status: text("status").notNull().default('pending'), // pending, confirmed
});

export const insertBookingSchema = createInsertSchema(bookings).omit({ id: true, status: true });
export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

// Contact Messages
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, createdAt: true });
export type ContactMessage = typeof contactMessages.$inferSelect;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;