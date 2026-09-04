import { neon } from "@neondatabase/serverless";

type Sql = ReturnType<typeof neon>;

let client: Sql | null = null;

export const isDatabaseConfigured = () => Boolean(process.env.DATABASE_URL);

/**
 * Cliente HTTP de Neon (serverless). Se memoiza por proceso; en dev el
 * hot-reload puede recrearlo, lo cual es barato porque no abre sockets.
 */
export function getSql(): Sql {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL no está configurada. Copiá .env.example a .env.local y pegá la connection string de Neon.");
  }
  client ??= neon(url);
  return client;
}
