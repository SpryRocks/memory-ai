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

const umzug = new Umzug({
  migrations: {
    glob: 'src/data/database/lancedb/migrations/*.ts',
  },
  storage: new Storage(),
  logger: console,
});

async function main() {
  const command = process.argv[2];

  if (command === 'up') {
    await umzug.up();
    console.log('🎉 Все таблицы LanceDB успешно обновлены!');
  } else if (command === 'down') {
    await umzug.down();
    console.log('↩️ Последний шаг успешно отменен!');
  } else {
    console.log('Использование: ts-node scripts/migrate-lance.ts [up|down]');
  }
}

main().catch(err => {
  console.error('❌ Ошибка миграции:', err);
  process.exit(1);
});
