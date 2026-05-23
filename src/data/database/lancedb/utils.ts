import path from "path";
import {connect, Connection} from "@lancedb/lancedb";

let db: Connection | undefined;

export async function getConnection() {
  if (!db) {
    const dbPath = path.join(process.cwd(), ".lancedb");
    db = await connect(dbPath);
  }
  return db;
}
