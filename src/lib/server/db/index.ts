import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';

// const connectionString = process.env.DATABASE_URL!;
// if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

// Disable prefetch as it is not supported for "Transaction" pool mode
