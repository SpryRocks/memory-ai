import { Umzug, UmzugStorage } from 'umzug';

import {getConnection} from "./utils";
import {Field, Schema, Utf8} from "apache-arrow";

const openMigrationsTable = async () => {
  const db = await getConnection();
  return db.createTable({
    name: 'migrations',
    existOk: true,
    data: [],
    schema: new Schema([
      new Field("name", new Utf8(), false),
    ]),
  });
}

class Storage implements UmzugStorage {
  async logMigration({ name }: {name: string}) {
    const table = await openMigrationsTable();
    await table.add([{ name }]);
  }

  async unlogMigration({ name }: {name: string}) {
    const table = await openMigrationsTable();
    await table.delete(`name = '${name}'`);
  }

  async executed() {
    const table = await openMigrationsTable();
    const rows = await table.query().toArray();
    return rows.map((r) => r.name);
  }
}

export const migration = new Umzug({
  migrations: {
    glob: 'src/data/database/lancedb/migrations/*.ts',
  },
  storage: new Storage(),
  logger: console,
});

export async function runLancedbMigrations() {
  try {
    console.log('--- Starting database migrations ---');
    await migration.up();
    console.log('--- Migrations executed successfully ---');
  } catch (error) {
    console.error('Migration failed during database initialization:', error);
    process.exit(1);
  }
}
