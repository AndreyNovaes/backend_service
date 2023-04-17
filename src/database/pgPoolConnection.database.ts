import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const poolConnectionClient = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export { poolConnectionClient };
