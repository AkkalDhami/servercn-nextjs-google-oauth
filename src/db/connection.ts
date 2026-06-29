// import { drizzle } from "drizzle-orm/node-postgres";

// const db = drizzle(process.env.DATABASE_URL!, {
//   logger: process.env.NODE_ENV === "development"
// });

// export default db;

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({
  client: sql,
  logger: process.env.NODE_ENV === "development"
});

export default db;
