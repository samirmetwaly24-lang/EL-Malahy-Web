import { z } from 'zod';
import { 
  insertAttractionSchema, 
  insertPackageSchema, 
  insertEventSchema, 
  insertBookingSchema, 
  insertContactMessageSchema,
  attractions,
  packages,
  events,
  bookings,
  contactMessages
} from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  attractions: {
    list: {
      method: 'GET' as const,
      path: '/api/attractions' as const,
      responses: {
        200: z.array(z.custom<typeof attractions.$inferSelect>()),
      },
    },
  },
  packages: {
    list: {
      method: 'GET' as const,
      path: '/api/packages' as const,
      responses: {
        200: z.array(z.custom<typeof packages.$inferSelect>()),
      },
    },
  },
  events: {
    list: {
      method: 'GET' as const,
      path: '/api/events' as const,
      responses: {
        200: z.array(z.custom<typeof events.$inferSelect>()),
      },
    },
  },
  bookings: {
    create: {
      method: 'POST' as const,
      path: '/api/bookings' as const,
      input: insertBookingSchema,
      responses: {
        201: z.custom<typeof bookings.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact' as const,
      input: insertContactMessageSchema,
      responses: {
        201: z.custom<typeof contactMessages.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
