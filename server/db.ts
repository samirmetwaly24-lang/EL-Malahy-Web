// db.ts
let db: any = null;

if (process.env.DATABASE_URL) {
  import("drizzle-orm/node-postgres").then(({ drizzle }) => {
    import("pg").then((pg) => {
      const { Pool } = pg.default;
      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      db = drizzle(pool);
      console.log("✅ Connected to database");
    });
  });
} else {
  console.log("⚠️ No DATABASE_URL → using mock data");
}

export { db };