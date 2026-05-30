import {runLancedbMigrations} from "@/data";

export async function register() {
  if (process.env.NODE_ENV === 'production') {
    await runLancedbMigrations();
  }
}
